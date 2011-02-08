SHJS.languages = SHJS.languages || { } ;

SHJS.languages['cpp'] = [
  [
    [
      /(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g,
      [SHJS.SYNTAX_PREFIX + 'keyword', SHJS.SYNTAX_PREFIX + 'normal', SHJS.SYNTAX_PREFIX + 'classname'],
      -1
    ],
    [
      /\b(?:class|const_cast|delete|dynamic_cast|explicit|false|friend|inline|mutable|namespace|new|operator|private|protected|public|reinterpret_cast|static_cast|template|this|throw|true|try|typeid|typename|using|virtual)\b/g,
      SHJS.SYNTAX_PREFIX + 'keyword',
      -1
    ],
    [
      /\/\/\//g,
      SHJS.SYNTAX_PREFIX + 'comment',
      1
    ],
    [
      /\/\//g,
      SHJS.SYNTAX_PREFIX + 'comment',
      7
    ],
    [
      /\/\*\*/g,
      SHJS.SYNTAX_PREFIX + 'comment',
      8
    ],
    [
      /\/\*/g,
      SHJS.SYNTAX_PREFIX + 'comment',
      9
    ],
    [
      /(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g,
      [SHJS.SYNTAX_PREFIX + 'keyword', SHJS.SYNTAX_PREFIX + 'normal', SHJS.SYNTAX_PREFIX + 'classname'],
      -1
    ],
    [
      /^[ \t]*#(?:[ \t]*include)/g,
      SHJS.SYNTAX_PREFIX + 'preproc',
      10,
      1
    ],
    [
      /^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g,
      SHJS.SYNTAX_PREFIX + 'preproc',
      -1
    ],
    [
      /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
      SHJS.SYNTAX_PREFIX + 'number',
      -1
    ],
    [
      /"/g,
      SHJS.SYNTAX_PREFIX + 'string',
      13
    ],
    [
      /'/g,
      SHJS.SYNTAX_PREFIX + 'string',
      14
    ],
    [
      /\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g,
      SHJS.SYNTAX_PREFIX + 'keyword',
      -1
    ],
    [
      /\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g,
      SHJS.SYNTAX_PREFIX + 'type',
      -1
    ],
    [
      /~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,
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
    ],
    [
      /([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g,
      [SHJS.SYNTAX_PREFIX + 'usertype', SHJS.SYNTAX_PREFIX + 'usertype', SHJS.SYNTAX_PREFIX + 'normal'],
      -1
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
      2,
      1
    ],
    [
      /<!DOCTYPE/g,
      SHJS.SYNTAX_PREFIX + 'preproc',
      4,
      1
    ],
    [
      /<!--/g,
      SHJS.SYNTAX_PREFIX + 'comment',
      5
    ],
    [
      /<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,
      SHJS.SYNTAX_PREFIX + 'keyword',
      -1
    ],
    [
      /<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,
      SHJS.SYNTAX_PREFIX + 'keyword',
      6,
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
      6,
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
      3
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
      3
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
      5
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
      3
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
      2,
      1
    ],
    [
      /<!DOCTYPE/g,
      SHJS.SYNTAX_PREFIX + 'preproc',
      4,
      1
    ],
    [
      /<!--/g,
      SHJS.SYNTAX_PREFIX + 'comment',
      5
    ],
    [
      /<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,
      SHJS.SYNTAX_PREFIX + 'keyword',
      -1
    ],
    [
      /<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,
      SHJS.SYNTAX_PREFIX + 'keyword',
      6,
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
      6,
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
  ],
  [
    [
      /$/g,
      null,
      -2
    ],
    [
      /</g,
      SHJS.SYNTAX_PREFIX + 'string',
      11
    ],
    [
      /"/g,
      SHJS.SYNTAX_PREFIX + 'string',
      12
    ],
    [
      /\/\/\//g,
      SHJS.SYNTAX_PREFIX + 'comment',
      1
    ],
    [
      /\/\//g,
      SHJS.SYNTAX_PREFIX + 'comment',
      7
    ],
    [
      /\/\*\*/g,
      SHJS.SYNTAX_PREFIX + 'comment',
      8
    ],
    [
      /\/\*/g,
      SHJS.SYNTAX_PREFIX + 'comment',
      9
    ]
  ],
  [
    [
      /$/g,
      null,
      -2
    ],
    [
      />/g,
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
      /"/g,
      SHJS.SYNTAX_PREFIX + 'string',
      -2
    ],
    [
      /\\./g,
      SHJS.SYNTAX_PREFIX + 'specialchar',
      -1
    ]
  ],
  [
    [
      /'/g,
      SHJS.SYNTAX_PREFIX + 'string',
      -2
    ],
    [
      /\\./g,
      SHJS.SYNTAX_PREFIX + 'specialchar',
      -1
    ]
  ]
];
