if (! SHJS.languages) {
  SHJS.sh_languages = {};
}
SHJS.languages['html'] = [
  [
    [
      /<\?xml/g,
      SHJS.SYNTAX_PREFIX + 'preproc',
      1,
      1
    ],
    [
      /<!DOCTYPE/g,
      SHJS.SYNTAX_PREFIX + 'preproc',
      3,
      1
    ],
    [
      /<!--/g,
      SHJS.SYNTAX_PREFIX + 'comment',
      4
    ],
    [
      /<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,
      SHJS.SYNTAX_PREFIX + 'keyword',
      -1
    ],
    [
      /<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,
      SHJS.SYNTAX_PREFIX + 'keyword',
      5,
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
      5,
      1
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
      4
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
  ]
];
