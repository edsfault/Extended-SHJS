var ExtSHJS = ExtSHJS || { } ;

SHJS.SYNTAX_PREFIX = 'extshjs_' ;
ExtSHJS.SYNTAX_PREFIX = 'extshjs';

SHJS.ClassicBehavior = false ;
SHJS.ExtendedBehavior = false ;

ExtSHJS.ClassicBehavior = false ;
ExtSHJS.ExtendedBehavior = true ;

ExtSHJS.getHighlightedDocumentFragment = function ( element , language , isExtendedBehavior )
{
    isExtendedBehavior = ( isExtendedBehavior == null ) || isExtendedBehavior ;

    var originalTags = [];
    var inputString = SHJS.extractTags(element, originalTags , isExtendedBehavior);
    var highlightTags = SHJS.highlightString(inputString, language);
    var tags = SHJS.mergeTags(originalTags, highlightTags);
    var documentFragment = SHJS.insertTags(tags, inputString);

    return documentFragment ;
} ;

ExtSHJS.getSyntaxElementsFrom = function ( paramDocumentFragment )
{
    var childNodeList = paramDocumentFragment.childNodes ;
    var ii ;
    var retSubElements = [] ;
    var nodeLanguage = '' ;

    for ( ii in childNodeList )
    {
        if ( ( childNodeList[ii].nodeType == 1 ) && ( childNodeList[ii].className ) )
        {
            nodeLanguage = childNodeList[ii].className.substring( 3 ) ;

            if ( nodeLanguage in SHJS.languages )
            {
                retSubElements.push ( {node: childNodeList[ii] , langName: nodeLanguage} ) ;
            }
        }
    }

    return retSubElements ;
} ;

ExtSHJS.highlightSubElement = function ( element , language )
{
    /*Get a reference to the parent node*/
    var parent = element.parentNode ;

    /*Highlight the element*/
    var highlightedDocumentFragment = ExtSHJS.getHighlightedDocumentFragment( element , language ) ;

    /*get syntax sub elements inside the current element*/
    var subElements = ExtSHJS.getSyntaxElementsFrom ( highlightedDocumentFragment ) ;
    var ii ;

    /*Highlight those syntax sub elements*/
    for ( ii in subElements )
    {
        ExtSHJS.highlightSubElement( subElements[ii].node , SHJS.languages[subElements[ii].langName] ) ;
    }

    /*Replace the element with its highlighted version*/
    parent.replaceChild( highlightedDocumentFragment , element) ;
} ;

ExtSHJS.highlightElement = function ( element , language , isExtendedBehavior )
{
    isExtendedBehavior = ( isExtendedBehavior == null ) || isExtendedBehavior ;

    SHJS.addClass(element, 'sh_sourceCode') ;

    var highlightedDocumentFragment = ExtSHJS.getHighlightedDocumentFragment( element , language , isExtendedBehavior ) ;
    var subElements = ExtSHJS.getSyntaxElementsFrom( highlightedDocumentFragment ) ;
    
    element.innerHTML = '' ;
    element.appendChild( highlightedDocumentFragment ) ;

    var ii ;

    for ( ii in subElements )
    {
        ExtSHJS.highlightSubElement( subElements[ii].node , SHJS.languages[subElements[ii].langName] ) ;
    }
} ;

/**
 * This function needs a lot of work
 */
ExtSHJS.syntaxSheet = function ( paramPreElement )
{
    var tdSyntax ;
    var tdLineNumber ;
    var trSyntax ;
    var preSyntax = document.createElement( 'pre' ) ;
    var tblSyntaxSheet = document.createElement( 'table' ) ;
    SHJS.addClass( tblSyntaxSheet , 'extshjs_sourceCode' ) ;
    var isAlternate = false ;
    var lineCount = 0 ;

    var childNodeList = paramPreElement.childNodes ;
    
    for ( var ii = 0 ; ii < childNodeList.length ; ii ++ )
    {
        if ( ( childNodeList[ii].nodeType == 1 ) && ( childNodeList[ii].tagName.toLowerCase() == 'br' ) )
        {
            //Line count goes up
            lineCount ++ ;

            //Apply style to the current pre element
            preSyntax.className = paramPreElement.className ;
            ( isAlternate ) && SHJS.addClass( preSyntax , 'extshjs_alternateLine' ) ;

            //Create a new line number cell, syntax cell, a new row.
            tdLineNumber = document.createElement( 'td' ) ;
            SHJS.addClass( tdLineNumber , 'extshjs_lineNumber' ) ;
            tdLineNumber.innerHTML = lineCount + '' ;

            //Add pre to the cell
            tdSyntax = document.createElement( 'td' ) ;
            SHJS.addClass( tdSyntax , 'extshjs_sourceCode' ) ;
            tdSyntax.appendChild( preSyntax ) ;

            //Add line number and syntax cellsto the row
            trSyntax = document.createElement( 'tr' ) ;
            ( isAlternate ) && SHJS.addClass( trSyntax , 'extshjs_alternateLine' ) ;
            trSyntax.appendChild( tdLineNumber ) ;
            trSyntax.appendChild( tdSyntax ) ;

            //Add row to the table
            tblSyntaxSheet.appendChild( trSyntax ) ;

            //Toggle alternate style
            isAlternate = ! isAlternate ;

            //Reset the pre element for a new syntax line
            preSyntax = document.createElement( 'pre' ) ;
        }
        else
        {
            preSyntax.appendChild( childNodeList[ii].cloneNode(true) ) ;
        }
    }

    if ( preSyntax.hasChildNodes() )
    {
        lineCount ++ ;

        //Apply style to the current pre element
        preSyntax.className = paramPreElement.className ;
        ( isAlternate ) && SHJS.addClass( preSyntax , 'extshjs_alternateLine' ) ;

        //Create a new line number cell, syntax cell, a new row.
        tdLineNumber = document.createElement( 'td' ) ;
        SHJS.addClass( tdLineNumber , 'extshjs_lineNumber' ) ;
        ( isAlternate ) && SHJS.addClass( tdLineNumber , 'extshjs_alternateLineNumber' ) ;
        tdLineNumber.innerHTML = lineCount + '' ;

        //Add pre to the cell
        tdSyntax = document.createElement( 'td' ) ;
        SHJS.addClass( tdSyntax , 'extshjs_sourceCode' ) ;
        ( isAlternate ) && SHJS.addClass( tdSyntax , 'extshjs_alternateLine' ) ;
        tdSyntax.appendChild( preSyntax ) ;

        //Add line number and syntax cellsto the row
        trSyntax = document.createElement( 'tr' ) ;
        trSyntax.appendChild( tdLineNumber ) ;
        trSyntax.appendChild( tdSyntax ) ;

        //Add row to the table
        tblSyntaxSheet.appendChild( trSyntax ) ;
    }

    paramPreElement.parentNode.replaceChild ( tblSyntaxSheet , paramPreElement ) ;
} ;

ExtSHJS.highlightDocument = function ( isExtendedBehavior )
{
    isExtendedBehavior = ( isExtendedBehavior == null ) || isExtendedBehavior ;

    var preElements = [] ;

    var currentElement = null ;
    var currentCssClass = '' ;
    var currentLanguage = '' ;

    for ( currentElement in document.getElementsByTagName('pre') )
    {
        preElements[currentElement] = ( document.getElementsByTagName('pre')[currentElement] ) ;
    }

    for ( currentElement in preElements )
    {
        currentCssClass = preElements[currentElement].className + '' ;
        if ( currentCssClass.substr( 0 , 3 ) == 'sh_' )
        {
            currentLanguage = currentCssClass.substring( 3 ) ;
            ExtSHJS.highlightElement( preElements[currentElement] , SHJS.languages[currentLanguage] , isExtendedBehavior ) ;
            //SHJS.highlightElement( preElements[currentElement] , SHJS.languages[currentLanguage] ) ;
            ExtSHJS.syntaxSheet( preElements[currentElement] ) ;
        }
    }
} ;