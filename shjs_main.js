/*
SHJS - Syntax Highlighting in JavaScript
Copyright (C) 2007, 2008 gnombat@users.sourceforge.net
License: http://shjs.sourceforge.net/doc/gplv3.html
*/

var SHJS = SHJS || { } ;

SHJS.languages = SHJS.languages || { } ;

SHJS.requests = { } ;

SHJS.isEmailAddress = function ( url )
{
    if ( /^mailto:/.test( url ) )
    {
        return false;
    }

    return url.indexOf( '@' ) !== -1 ;
} ;

SHJS.setHref = function ( tags , numTags , inputString )
{
    var url = inputString.substring( tags[numTags - 2].pos , tags[numTags - 1].pos ) ;
    if ( url.length >= 2 && url.charAt(0) === '<' && url.charAt( url.length - 1 ) === '>' )
    {
        url = url.substr( 1 , url.length - 2 ) ;
    }

    if ( SHJS.isEmailAddress( url ) )
    {
        url = 'mailto:' + url;
    }

    tags[numTags - 2].node.href = url;
} ;

/*
Konqueror has a bug where the regular expression /$/g will not match at the end
of a line more than once:

  var regex = /$/g;
  var match;

  var line = '1234567890';
  regex.lastIndex = 10;
  match = regex.exec(line);

  var line2 = 'abcde';
  regex.lastIndex = 5;
  match = regex.exec(line2);  // fails
*/
SHJS.konquerorExec = function ( s )
{
    var result = [''];
    result.index = s.length;
    result.input = s;
    return result;
} ;

/**
Highlights all elements containing source code in a text string.  The return
value is an array of objects, each representing an HTML start or end tag.  Each
object has a property named pos, which is an integer representing the text
offset of the tag. Every start tag also has a property named node, which is the
DOM element started by the tag. End tags do not have this property.
@param  inputString  a text string
@param  language  a language definition object
@return  an array of tag objects
*/
SHJS.highlightString = function ( inputString , language )
{
    if ( /Konqueror/.test( navigator.userAgent ) )
    {
        if ( ! language.konquered )
        {
            for ( var s = 0 ; s < language.length ; s++ )
            {
                for ( var p = 0 ; p < language[s].length ; p++ )
                {
                    var r = language[s][p][0] ;
                    if ( r.source === '$' )
                    {
                        r.exec = SHJS.konquerorExec;
                    }
                }
            }
            language.konquered = true;
        }
    }

    var a = document.createElement('a');
    var span = document.createElement('span');

    // the result
    var tags = [];
    var numTags = 0;

    // each element is a pattern object from language
    var patternStack = [];

    // the current position within inputString
    var pos = 0;

    // the name of the current style, or null if there is no current style
    var currentStyle = null;

    var output = function(s, style)
    {
        var length = s.length;
        // this is more than just an optimization - we don't want to output empty <span></span> elements
        if (length === 0)
        {
            return;
        }
        if (! style)
        {
            var stackLength = patternStack.length;
            if (stackLength !== 0)
            {
                var pattern = patternStack[stackLength - 1];
                // check whether this is a state or an environment
                if (! pattern[3])
                {
                    // it's not a state - it's an environment; use the style for this environment
                    style = pattern[1];
                }
            }
        }
        if (currentStyle !== style)
        {
            if (currentStyle)
            {
                tags[numTags++] = {pos: pos};
                if (currentStyle === 'sh_url')
                {
                    SHJS.setHref(tags, numTags, inputString);
                }
            }
            
            if (style)
            {
                var clone;
                if (style === 'sh_url')
                {
                    clone = a.cloneNode(false);
                }
                else
                {
                    clone = span.cloneNode(false);
                }

                clone.className = style;
                tags[numTags++] = {node: clone, pos: pos};
            }
        }
        
        pos += length;
        currentStyle = style;
    } ;

    var endOfLinePattern = /\r\n|\r|\n/g;
    endOfLinePattern.lastIndex = 0;
    var inputStringLength = inputString.length;
    while (pos < inputStringLength)
    {
        var start = pos;
        var end;
        var startOfNextLine;
        var endOfLineMatch = endOfLinePattern.exec(inputString);
        if (endOfLineMatch === null)
        {
            end = inputStringLength;
            startOfNextLine = inputStringLength;
        }
        else
        {
            end = endOfLineMatch.index;
            startOfNextLine = endOfLinePattern.lastIndex;
        }

        var line = inputString.substring(start, end);

        var matchCache = [];
        for (;;)
        {
            var posWithinLine = pos - start;
            var stateIndex;
            var stackLength = patternStack.length;

            if (stackLength === 0)
            {
                stateIndex = 0;
            }
            else
            {
                // get the next state
                stateIndex = patternStack[stackLength - 1][2];
            }

            var state = language[stateIndex];
            var numPatterns = state.length;
            var mc = matchCache[stateIndex];

            if (! mc)
            {
                mc = matchCache[stateIndex] = [];
            }

            var bestMatch = null;
            var bestPatternIndex = -1;

            for (var i = 0; i < numPatterns; i++)
            {
                var match;
                if (i < mc.length && (mc[i] === null || posWithinLine <= mc[i].index))
                {
                    match = mc[i];
                }
                else
                {
                    var regex = state[i][0];
                    regex.lastIndex = posWithinLine;
                    match = regex.exec(line);
                    mc[i] = match;
                }

                if (match !== null && (bestMatch === null || match.index < bestMatch.index))
                {
                    bestMatch = match;
                    bestPatternIndex = i;
                    if (match.index === posWithinLine)
                    {
                        break;
                    }
                }
            }

            if (bestMatch === null)
            {
                output(line.substring(posWithinLine), null);
                break;
            }
            else
            {
                // got a match
                if (bestMatch.index > posWithinLine)
                {
                    output(line.substring(posWithinLine, bestMatch.index), null);
                }

                var pattern = state[bestPatternIndex];
                var newStyle = pattern[1];
                var matchedString;

                if (newStyle instanceof Array)
                {
                    for (var subexpression = 0; subexpression < newStyle.length; subexpression++)
                    {
                        matchedString = bestMatch[subexpression + 1];
                        output(matchedString, newStyle[subexpression]);
                    }
                }
                else
                {
                    matchedString = bestMatch[0];
                    output(matchedString, newStyle);
                }

                switch (pattern[2])
                {
                    case -1:
                        // do nothing
                    break;

                    case -2:
                        // exit
                        patternStack.pop();
                    break;

                    case -3:
                        // exitall
                        patternStack.length = 0;
                    break;

                    default:
                        // this was the start of a delimited pattern or a state/environment
                        patternStack.push(pattern);
                    break;
                }
            }
        }

        // end of the line
        if (currentStyle)
        {
            tags[numTags++] = {pos: pos};
            if (currentStyle === 'sh_url')
            {
                SHJS.setHref(tags, numTags, inputString);
            }
            currentStyle = null;
        }
        pos = startOfNextLine;
    }

    return tags;
}


////////////////////////////////////////////////////////////////////////////////
// DOM-dependent functions
SHJS.getClasses = function ( element )
{
    var result = [] ;
    var htmlClass = element.className ;
    if (htmlClass && htmlClass.length > 0)
    {
        var htmlClasses = htmlClass.split(' ');
        for (var i = 0; i < htmlClasses.length; i++)
        {
            if (htmlClasses[i].length > 0)
            {
                result.push(htmlClasses[i]);
            }
        }
    }
    return result;
} ;

SHJS.addClass = function (element, name)
{
    var htmlClasses = SHJS.getClasses(element);
    for (var i = 0; i < htmlClasses.length; i++)
    {
        if (name.toLowerCase() === htmlClasses[i].toLowerCase())
        {
            return;
        }
    }
    htmlClasses.push(name);
    element.className = htmlClasses.join(' ');
} ;


//This function could use some work
/**
Extracts the tags from an HTML DOM NodeList.
@param  nodeList  a DOM NodeList
@param  result  an object with text, tags and pos properties
*/
SHJS.extractTagsFromNodeList = function ( nodeList , result )
{
    var length = nodeList.length;
    var brElement = document.createElement( 'br' ) ;
    
    var terminator ;
    if (/MSIE/.test(navigator.userAgent))
    {
        terminator = '\r';
    }
    else if ( /OPERA/i.test(navigator.userAgent) )
    {
        terminator = "\r\n" ;
    }
    else
    {
        terminator = '\n';
    }

    for (var i = 0; i < length; i++)
    {
        var node = nodeList.item(i);
        switch (node.nodeType)
        {
            case 1:
                if ( ( node.className ) && ( node.className.substr( 0 , 3 ) == 'sh_' ) )
                {
                    result.tags.push({node: node.cloneNode(true), pos: result.pos});
                }
                else
                {
                    result.tags.push({node: node.cloneNode(false), pos: result.pos});
                    SHJS.extractTagsFromNodeList(node.childNodes, result);
                }
                result.tags.push({pos: result.pos});
            break;
            case 3:
            case 4:
                //If statement added by me
                //It needs some work
                if ( /([\r\n]|\r\n)/.test( node.data ) )
                {
                    var textLines = node.data.split ( terminator ) ;
                    var endOfTextIndex = 0 ;
                    
                    for ( var j = 0 ; j < textLines.length ; j ++ )
                    {
                        if ( textLines[j] != "" )
                        {
                            //alert ( "Begin " + textLines[j][textLines[j].length-1] + " End" ) ;
                            result.text.push( textLines[j] ) ;
                            result.pos += textLines[j].length ;

                            endOfTextIndex = endOfTextIndex + textLines[j].length ;
                        }

                        //Can and will be improved
                        if ( node.data.substr(endOfTextIndex , terminator.length ) == terminator )
                        {
                            result.tags.push ( {node: brElement.cloneNode(false) , pos: result.pos} ) ;
                            result.tags.push({pos: result.pos});

                            endOfTextIndex = endOfTextIndex + terminator.length ;
                        }
                    }
                }
                else
                {
                    result.text.push(node.data);
                    result.pos += node.length;
                }
            break;
        }
    }
} ;

/**
Extracts the tags from the text of an HTML element. The extracted tags will be
returned as an array of tag objects. See SHJS.highlightString for the format of
the tag objects.
@param  element  a DOM element
@param  tags  an empty array; the extracted tag objects will be returned in it
@return  the text of the element
@see  SHJS.highlightString
*/
SHJS.extractTags = function ( element , tags )
{
    var result = {};
    result.text = [];
    result.tags = tags;
    result.pos = 0;
    SHJS.extractTagsFromNodeList(element.childNodes, result);
    return result.text.join('');
}

/**
Merges the original tags from an element with the tags produced by highlighting.
@param  originalTags  an array containing the original tags
@param  highlightTags  an array containing the highlighting tags - these must not overlap
@result  an array containing the merged tags
*/
SHJS.mergeTags = function (originalTags, highlightTags)
{
    var numOriginalTags = originalTags.length;
    if (numOriginalTags === 0)
    {
        return highlightTags;
    }

    var numHighlightTags = highlightTags.length;
    if (numHighlightTags === 0)
    {
        return originalTags;
    }

    var result = [];
    var originalIndex = 0;
    var highlightIndex = 0;

    while (originalIndex < numOriginalTags && highlightIndex < numHighlightTags)
    {
        var originalTag = originalTags[originalIndex];
        var highlightTag = highlightTags[highlightIndex];

        if (originalTag.pos <= highlightTag.pos)
        {
            result.push(originalTag);
            originalIndex++;
        }
        else
        {
            result.push(highlightTag);
            if (highlightTags[highlightIndex + 1].pos <= originalTag.pos)
            {
                highlightIndex++;
                result.push(highlightTags[highlightIndex]);
                highlightIndex++;
            }
            else
            {
                // new end tag
                result.push({pos: originalTag.pos});

                // new start tag
                highlightTags[highlightIndex] = {node: highlightTag.node.cloneNode(false), pos: originalTag.pos};
            }
        }
    }

    while (originalIndex < numOriginalTags)
    {
        result.push(originalTags[originalIndex]);
        originalIndex++;
    }

    while (highlightIndex < numHighlightTags)
    {
        result.push(highlightTags[highlightIndex]);
        highlightIndex++;
    }

    return result;
}

/**
Inserts tags into text.
@param  tags  an array of tag objects
@param  text  a string representing the text
@return  a DOM DocumentFragment representing the resulting HTML
*/
SHJS.insertTags = function ( tags , text )
{
    var doc = document;

    var result = document.createDocumentFragment();
    var tagIndex = 0;
    var numTags = tags.length;
    var textPos = 0;
    var textLength = text.length;
    var currentNode = result;

    // output one tag or text node every iteration
    while (textPos < textLength || tagIndex < numTags)
    {
        var tag;
        var tagPos;
        if (tagIndex < numTags)
        {
            tag = tags[tagIndex];
            tagPos = tag.pos;
        }
        else
        {
            tagPos = textLength;
        }

        if (tagPos <= textPos)
        {
            // output the tag
            if (tag.node)
            {
                // start tag
                var newNode = tag.node;
                currentNode.appendChild(newNode);
                currentNode = newNode;
            }
            else
            {
                // end tag
                currentNode = currentNode.parentNode;
            }
            tagIndex++;
        }
        else
        {
            // output text
            currentNode.appendChild(doc.createTextNode(text.substring(textPos, tagPos)));
            textPos = tagPos;
        }
    }

    return result;
}

/**
Highlights an element containing source code.  Upon completion of this function,
the element will have been placed in the "SHJS.sourceCode" class.
@param  element  a DOM <pre> element containing the source code to be highlighted
@param  language  a language definition object
*/
SHJS.highlightElement = function ( element , language )
{
    SHJS.addClass(element, 'sh_sourceCode');
    var originalTags = [];
    var inputString = SHJS.extractTags(element, originalTags);
    var highlightTags = SHJS.highlightString(inputString, language);
    var tags = SHJS.mergeTags(originalTags, highlightTags);
    var documentFragment = SHJS.insertTags(tags, inputString);

    while (element.hasChildNodes())
    {
        element.removeChild(element.firstChild);
    }

    element.appendChild(documentFragment);
}

SHJS.getXMLHttpRequest = function ( )
{
    if ( window.XMLHttpRequest )
    {
        return new XMLHttpRequest();
    }
    else if ( window.ActiveXObject )
    {
        return new ActiveXObject( 'Msxml2.XMLHTTP' ) ;
    }
    else
    {
        throw 'No XMLHttpRequest implementation available' ;
    }
} ;


SHJS.load = function ( language , element , prefix , suffix )
{
    if (language in SHJS.requests)
    {
        SHJS.requests[language].push(element);
        return;
    }
    SHJS.requests[language] = [element];
    var request = SHJS.getXMLHttpRequest();
    var url = prefix + 'sh_' + language + suffix;
    request.open('GET', url, true);
    request.onreadystatechange = function ()
    {
        if (request.readyState === 4)
        {
            try
            {
                if (! request.status || request.status === 200)
                {
                    eval(request.responseText);
                    var elements = SHJS.requests[language];
                    for (var i = 0; i < elements.length; i++)
                    {
                        SHJS.highlightElement(elements[i], SHJS.languages[language]);
                    }
                }
                else
                {
                    throw 'HTTP error: status ' + request.status;
                }
            }
            finally
            {
                request = null;
            }
        }
    } ;
    request.send(null);
}



/**
Highlights all elements containing source code on the current page. Elements
containing source code must be "pre" elements with a "class" attribute of
"SHJS.LANGUAGE", where LANGUAGE is a valid language identifier; e.g., "SHJS.java"
identifies the element as containing "java" language source code.
*/
SHJS.highlightDocument = function ( prefix , suffix )
{
    var nodeList = document.getElementsByTagName('pre');
    for (var i = 0; i < nodeList.length; i++)
    {
        var element = nodeList.item(i);
        var htmlClasses = SHJS.getClasses(element);
        for (var j = 0; j < htmlClasses.length; j++)
        {
            var htmlClass = htmlClasses[j].toLowerCase();
            if (htmlClass === 'sh_sourcecode')
            {
                continue;
            }
            if (htmlClass.substr(0, 3) === 'sh_')
            {
                var language = htmlClass.substring(3);
                if (language in SHJS.languages)
                {
                    SHJS.highlightElement(element, SHJS.languages[language]);
                }
                else if (typeof(prefix) === 'string' && typeof(suffix) === 'string')
                {
                    SHJS.load(language, element, prefix, suffix);
                }
                else
                {
                    throw 'Found <pre> element with class="' + htmlClass + '", but no such language exists';
                }
                break;
            }
        }
    }
}
