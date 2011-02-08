if (! SHJS.languages) {
  SHJS.languages = {};
}
SHJS.languages['php'] = [
  [
    [
      /\b(?:include|include_once|require|require_once)\b/g,
      SHJS.SYNTAX_PREFIX + 'preproc',
      -1
    ],
    [
      /\/\//g,
      SHJS.SYNTAX_PREFIX + 'comment',
      1
    ],
    [
      /#/g,
      SHJS.SYNTAX_PREFIX + 'comment',
      1
    ],
    [
      /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
      SHJS.SYNTAX_PREFIX + 'number',
      -1
    ],
    [
      /"/g,
      SHJS.SYNTAX_PREFIX + 'string',
      2
    ],
    [
      /'/g,
      SHJS.SYNTAX_PREFIX + 'string',
      3
    ],
    [
      /\b(?:and|or|xor|__FILE__|exception|php_user_filter|__LINE__|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|each|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|for|foreach|function|global|if|isset|list|new|old_function|print|return|static|switch|unset|use|var|while|__FUNCTION__|__CLASS__|__METHOD__)\b/g,
      SHJS.SYNTAX_PREFIX + 'keyword',
      -1
    ],
    [
      /\/\/\//g,
      SHJS.SYNTAX_PREFIX + 'comment',
      4
    ],
    [
      /\/\//g,
      SHJS.SYNTAX_PREFIX + 'comment',
      1
    ],
    [
      /\/\*\*/g,
      SHJS.SYNTAX_PREFIX + 'comment',
      9
    ],
    [
      /\/\*/g,
      SHJS.SYNTAX_PREFIX + 'comment',
      10
    ],
    [
      /(?:\$[#]?|@|%)[A-Za-z0-9_]+/g,
      SHJS.SYNTAX_PREFIX + 'variable',
      -1
    ],
    [
      /<\?php|~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,
      SHJS.SYNTAX_PREFIX + 'symbol',
      -1
    ],
    [
      /\{|\}/g,
      SHJS.SYNTAX_PREFIX + 'cbracket',
      -1
    ],
    [
      /(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g,
      SHJS.SYNTAX_PREFIX + 'function',
      -1
    ]
  ],
  [
    [
      /$/g,
      null,
      -2
    ]
  ],
  [
    [
      /\\(?:\\|")/g,
      null,
      -1
    ],
    [
      /"/g,
      SHJS.SYNTAX_PREFIX + 'string',
      -2
    ]
  ],
  [
    [
      /\\(?:\\|')/g,
      null,
      -1
    ],
    [
      /'/g,
      SHJS.SYNTAX_PREFIX + 'string',
      -2
    ]
  ],
  [
    [
      /$/g,
      null,
      -2
    ],
    [
      /(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,
      SHJS.SYNTAX_PREFIX + 'url',
      -1
    ],
    [
      /<\?xml/g,
      SHJS.SYNTAX_PREFIX + 'preproc',
      5,
      1
    ],
    [
      /<!DOCTYPE/g,
      SHJS.SYNTAX_PREFIX + 'preproc',
      6,
      1
    ],
    [
      /<!--/g,
      SHJS.SYNTAX_PREFIX + 'comment',
      7
    ],
    [
      /<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,
      SHJS.SYNTAX_PREFIX + 'keyword',
      -1
    ],
    [
      /<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,
      SHJS.SYNTAX_PREFIX + 'keyword',
      8,
      1
    ],
    [
      /&(?:[A-Za-z0-9]+);/g,
      SHJS.SYNTAX_PREFIX + 'preproc',
      -1
    ],
    [
      /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      SHJS.SYNTAX_PREFIX + 'keyword',
      -1
    ],
    [
      /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      SHJS.SYNTAX_PREFIX + 'keyword',
      8,
      1
    ],
    [
      /@[A-Za-z]+/g,
      SHJS.SYNTAX_PREFIX + 'type',
      -1
    ],
    [
      /(?:TODO|FIXME|BUG)(?:[:]?)/g,
      SHJS.SYNTAX_PREFIX + 'todo',
      -1
    ]
  ],
  [
    [
      /\?>/g,
      SHJS.SYNTAX_PREFIX + 'preproc',
      -2
    ],
    [
      /([^=" \t>]+)([ \t]*)(=?)/g,
      [SHJS.SYNTAX_PREFIX + 'type', SHJS.SYNTAX_PREFIX + 'normal', SHJS.SYNTAX_PREFIX + 'symbol'],
      -1
    ],
    [
      /"/g,
      SHJS.SYNTAX_PREFIX + 'string',
      2
    ]
  ],
  [
    [
      />/g,
      SHJS.SYNTAX_PREFIX + 'preproc',
      -2
    ],
    [
      /([^=" \t>]+)([ \t]*)(=?)/g,
      [SHJS.SYNTAX_PREFIX + 'type', SHJS.SYNTAX_PREFIX + 'normal', SHJS.SYNTAX_PREFIX + 'symbol'],
      -1
    ],
    [
      /"/g,
      SHJS.SYNTAX_PREFIX + 'string',
      2
    ]
  ],
  [
    [
      /-->/g,
      SHJS.SYNTAX_PREFIX + 'comment',
      -2
    ],
    [
      /<!--/g,
      SHJS.SYNTAX_PREFIX + 'comment',
      7
    ]
  ],
  [
    [
      /(?:\/)?>/g,
      SHJS.SYNTAX_PREFIX + 'keyword',
      -2
    ],
    [
      /([^=" \t>]+)([ \t]*)(=?)/g,
      [SHJS.SYNTAX_PREFIX + 'type', SHJS.SYNTAX_PREFIX + 'normal', SHJS.SYNTAX_PREFIX + 'symbol'],
      -1
    ],
    [
      /"/g,
      SHJS.SYNTAX_PREFIX + 'string',
      2
    ]
  ],
  [
    [
      /\*\//g,
      SHJS.SYNTAX_PREFIX + 'comment',
      -2
    ],
    [
      /(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,
      SHJS.SYNTAX_PREFIX + 'url',
      -1
    ],
    [
      /<\?xml/g,
      SHJS.SYNTAX_PREFIX + 'preproc',
      5,
      1
    ],
    [
      /<!DOCTYPE/g,
      SHJS.SYNTAX_PREFIX + 'preproc',
      6,
      1
    ],
    [
      /<!--/g,
      SHJS.SYNTAX_PREFIX + 'comment',
      7
    ],
    [
      /<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,
      SHJS.SYNTAX_PREFIX + 'keyword',
      -1
    ],
    [
      /<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,
      SHJS.SYNTAX_PREFIX + 'keyword',
      8,
      1
    ],
    [
      /&(?:[A-Za-z0-9]+);/g,
      SHJS.SYNTAX_PREFIX + 'preproc',
      -1
    ],
    [
      /<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,
      SHJS.SYNTAX_PREFIX + 'keyword',
      -1
    ],
    [
      /<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,
      SHJS.SYNTAX_PREFIX + 'keyword',
      8,
      1
    ],
    [
      /@[A-Za-z]+/g,
      SHJS.SYNTAX_PREFIX + 'type',
      -1
    ],
    [
      /(?:TODO|FIXME|BUG)(?:[:]?)/g,
      SHJS.SYNTAX_PREFIX + 'todo',
      -1
    ]
  ],
  [
    [
      /\*\//g,
      SHJS.SYNTAX_PREFIX + 'comment',
      -2
    ],
    [
      /(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,
      SHJS.SYNTAX_PREFIX + 'url',
      -1
    ],
    [
      /(?:TODO|FIXME|BUG)(?:[:]?)/g,
      SHJS.SYNTAX_PREFIX + 'todo',
      -1
    ]
  ]
];
