
const win = {
  show: true,

  viewport: {
    width: 800,
    height: 800,
  },

  actions: [
    {
      method: 'goto',
      args: ['https://duckduckgo.com']
    },
    {
      method: 'type',
      args: ['#search_form_input_homepage', 'github nightmare']
    },
    {
      method: 'click',
      args: ['#search_button_homepage']
    },
    {
      method: 'wait',
      args: ['#zero_click_wrapper .c-info__title a']
    },
    {
      method: 'evaluate',
      args: [
        function () {
          return document.querySelector('#zero_click_wrapper .c-info__title a').href;
        }
      ]
    },
    {
      method: 'end',
    },
    // {
    //   method: 'then',
    //   args: [
    //     function (result) {
    //       console.log(result);
    //       return result
    //     }
    //   ]
    // }
  ]
}

const altActions = [
  {
    method: 'goto',
    args: ['https://google.com']
  },
  {
    method: 'type',
    args: ['#lst-ib', 'github nightmare']
  },
  {
    method: 'click',
    args: ['[value="Google Search"]']
  },
  {
    method: 'wait',
    args: ['#center_col']
  },
  {
    method: 'wait',
    args: [100]
  },
  {
    method: 'evaluate',
    args: [
      function () {
        return document.title;
      }
    ]
  },
  {
    method: 'end',
  }
]

module.exports = {
  debug: true,
  // order: ['win1'],
  windows: {
    win1: win,
    win2: Object.assign({}, win, {
      actions: altActions
    }),
  }
}
