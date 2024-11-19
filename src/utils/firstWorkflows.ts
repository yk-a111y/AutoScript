const nodes = [
  {
    data: {
      active: true,
      customUserAgent: false,
      description: '跳转快手直播后台',
      disableBlock: false,
      inGroup: false,
      onError: {
        dataToInsert: [],
        enable: false,
        insertData: false,
        retry: false,
        retryInterval: 2,
        retryTimes: 1,
        toDo: 'error',
      },
      settings: {
        blockTimeout: 0,
        debugMode: false,
      },
      tabZoom: 1,
      updatePrevTab: false,
      url: 'https://live.kuaishou.com/u/3xssryfshxy33uu',
      userAgent: '',
      waitTabLoaded: false,
      label: 'new-tab',
    },
    events: {},
    id: '7bia12p',
    position: {
      x: 680,
      y: 36,
    },
    type: 'BlockBasic',
  },
  {
    data: {
      $breakpoint: false,
      code: "console.log(\"直播间插件开始执行...\");\n\nconst chatHistory = document.querySelector('.chat-history');\nconst observer = new MutationObserver((mutations) => {\n  mutations.forEach(mutation => {\n\t\tmutation.addedNodes.forEach(addedNode => {\n\t\t\tconsole.log('检测到评论区变化', addedNode, automaRefData('table', '0').title);\n\t\t\thandleKuaiShouLiveRoom(addedNode);\n\t\t});\n\t})\n});\n\n// 观察评论区变化\nconst config = { childList: true, subtree: true };observer.observe(chatHistory, config);\nobserver.observe(chatHistory, config);\n\n// 评论区新增DOM的回调\nconst handleKuaiShouLiveRoom = (addedNode) => {\n  // 如果回复过，不再评论\n  if (addedNode instanceof Element && addedNode.getAttribute(\"hasComment\") == \"true\") return;\n\n  // 获取评论人昵称和内容\n\tconst nickname = getTextNodeContent(addedNode, './/span[contains(@class,\"username\")]');\n  // console.log('!!!!!!!!!!!!', nickname)\n\tconst comment = getTextNodeContent(addedNode, './/span[contains(@class,\"comment\")]');\n  // console.log('!!!!!!!!!!!!', comment)\n\tif (!nickname || !comment) return;\n\n  // 获取直播间ID和昵称\n\tconst { bName, bExternalId } = getNameAndId();\n\n  // TODO 判断黑名单\n\n  // 自动回复\n  const replyContent = processQaKeywords(comment);\n  console.log('!!!!!!!!!!!!', replyContent)\n  const replyTimestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);\n\n  if (replyContent) {\n\t\t// 发送评论输入框内容\n\t\tsendTextareaContent(replyContent)\n\t\t// 给addedNode添加一个属性，用于判断是否已经处理过评论\n\t\taddedNode.setAttribute(\"hasComment\", \"true\");\n\t\t// 评论的内容\n\t\t// const requestObj = {\n\t\t// \tmsg: nickname + \":\" + comment,\n\t\t// \ttime: new Date().toISOString().slice(0, 19).replace('T', ' '),\n\t\t// \tnickname,\n\t\t// };\n\t\t// AI回答\n\t\t// const responseObj = replyContent && {\n\t\t// \tmsg: bName + \":\" + replyContent,\n\t\t// \ttime: replyTimestamp,\n\t\t// \tnickname: bName,\n\t\t// };\n\t\t// const params = {\n\t\t// \tapplicationScene: LivePlatform.KUAISHOU, // 抖音直播\n\t\t// \tdataSource: dataSource.LIVE_ROOM, // 1: 短视频，2: 直播间\n\t\t// \tname: liveStreamingName, // 直播间名称\n\t\t// \tbExternalId,\n\t\t// \tbName,\n\t\t// \tnickname,\n\t\t// \tcontent: [requestObj, responseObj].map(JSON.stringify).join(\",\"),\n\t\t// }\n\t\t// 上报直播评论以及回复\n\t\t// sendCommentPostRequest('https://vshow.58.com/live/externaldata/report', params, () => { })\n\t\t// TODO: AI语音回复接口\n\t\t// sendGetRequest('https://10.253.104.141:9902/generate_audio', {\n\t\t// \ttext: replyContent,\n\t\t// \tdevice_name: bName,\n\t\t// \tdouyin_id: bExternalId,\n\t\t// }, () => { })\n\t}\n}\n\n// 获取节点的文本内容\nconst getTextNodeContent = (node, xpath) => {\n  const element = document.evaluate(xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;\n  return element ? element.textContent.replace(\"：\", \"\").replace(\":\", \"\").trim() : null;\n}\n\n// 获取快手直播账号的昵称和ID\nconst getNameAndId = () => {\n\tconst nameElement = document.querySelector('.name-group .name');\n\tconst bName = nameElement?.textContent.trim() || '';\n\tconst bExternalId = window.location.pathname.split('/').pop() || '';\n\n\treturn { bName, bExternalId };\n}\n\n// 发送快手评论框内容\nfunction sendTextareaContent(content) {\n\tconst textarea = document.querySelector('textarea.box-boder');\n\tif (textarea) {\n\t\t// 设置文本域内容\n\t\ttextarea.value = content;\n\t\tconst event = new Event('input', { bubbles: true });\n\t\ttextarea.dispatchEvent(event);\n\t\t// 点击发送按钮\n\t\tsetTimeout(() => {\n\t\t\tconst submitButton = document.querySelector('.submit-button.valid');\n\t\t\tif (submitButton) {\n\t\t\t\tsubmitButton.click();\n\t\t\t}\n\t\t}, 100)\n\t}\n}\n\nconst defaultQaKeywords = `\n多少钱#具体的费用您可以点击小黄车查看，咱们想要哪个服务直接买就行\n在哪里#您可以先下单，能下单的话就是可以给您提供服务的\n时间#咱们是一周7天都可以提供服务的，您在下单的时候选择上门服务的时间就行了\n购买#点击屏幕下方的小黄车，点击需要的服务直接购买就行啊\n退款#过期不用都是自动退哈，这点也请放心，可以先囤着\n`\n\n//关键词自动回复的匹配内容\nfunction processQaKeywords(comment) {\n\tlet replyContent = \"\";\n\n\tif (!comment) return '';\n\n\t// TODO 合并默认知识库和用户自定义知识库\n\tlet combinedQaKeywords = defaultQaKeywords;\n\n\tlet qaKeywordsArr = combinedQaKeywords.split(\"\\n\");\n\tfor (let index in qaKeywordsArr) {\n\t\tlet row = qaKeywordsArr[index];\n\t\tlet qa = row.split(\"#\");\n\t\tif (qa.length !== 2) {\n\t\t\tcontinue;\n\t\t}\n\t\tlet keywords = qa[0].split(\"|\");\n\t\tif (containsKeyword(comment, keywords)) {\n\t\t\treplyContent = qa[1];\n\t\t\treturn replyContent;\n\t\t}\n\t}\n\treturn replyContent;\n}\n\n//判断js字符串是否包含一个关键词数组的任意一个关键词\nfunction containsKeyword(inputString, keywords) {\n  if (keywords.length == 0) return false;\n  for (var i = 0; i < keywords.length; i++) {\n    if (!keywords[i]) continue;\n    if (inputString.includes(keywords[i])) {\n      return true;\n    }\n  }\n  return false;\n}",
      context: 'website',
      description: '开启评论监听',
      disableBlock: false,
      everyNewTab: false,
      preloadScripts: [],
      runBeforeLoad: false,
      settings: {
        blockTimeout: 0,
        debugMode: false,
      },
      timeout: 20000,
      label: 'javascript-code',
    },
    events: {},
    id: 'r0re6is',
    position: {
      x: 1554.684096971826,
      y: 37.27159220860314,
    },
    type: 'BlockBasic',
  },
  {
    data: {
      assignVariable: true,
      dataColumn: 'LhNWl',
      description: '',
      disableBlock: true,
      domain: '',
      expirationDate: '',
      getAll: true,
      httpOnly: false,
      jsonCode: '{\n\n}',
      name: '',
      path: '',
      sameSite: '',
      saveData: true,
      secure: false,
      session: false,
      type: 'get',
      url: 'https://live.kuaishou.com',
      useJson: false,
      value: '',
      variableName: 'siteCookie',
      label: 'cookie',
    },
    events: {},
    id: '7utnt7e',
    position: {
      x: 972,
      y: 36,
    },
    type: 'BlockBasic',
  },
];

export default [
  {
    extVersion: '1.28.27',
    id: 'K_DOm5PCBGSWf1e90io1a',
    name: '测试工作流',
    icon: 'RiGlobalLine',
    table: [
      {
        id: 'LhNWl',
        name: 'title',
        type: 'string',
      },
      {
        id: 'wua-p',
        name: 'config',
        type: 'array',
      },
    ],
    version: '1.28.27',
    drawflow: {
      edges: [
        {
          type: 'custom-edge',
          updatable: true,
          selectable: true,
          markerEnd: 'arrowclosed',
          sourceHandle: '7bia12p-output-1',
          targetHandle: '7utnt7e-input-1',
          source: '7bia12p',
          target: '7utnt7e',
          data: {},
          events: {},
          id: '1-2',
          sourceX: 955.9998747975799,
          sourceY: 315.9999930807034,
          targetX: 1016.0000597761718,
          targetY: 315.9999930807034,
        },
      ],
      nodes: nodes,
      position: [-1436.15635541965, 100.17791489822486],
      viewport: {
        x: -1436.15635541965,
        y: 100.17791489822486,
        zoom: 1.1500501527875697,
      },
      zoom: 1.1500501527875697,
    },
    settings: {
      blockDelay: 0,
      debugMode: false,
      defaultColumnName: 'column',
      execContext: 'popup',
      executedBlockOnWeb: false,
      inputAutocomplete: true,
      insertDefaultColumn: true,
      notification: true,
      onError: 'stop-workflow',
      publicId: '',
      restartTimes: 3,
      reuseLastState: false,
      saveLog: true,
      tabLoadTimeout: 30000,
    },
    globalData: '{\n\t"key": "value",\n  "test": "hello"\n}',
    description: '快手直播自动回复、循环话术、欢迎语',
    includedWorkflows: {},
  },
];