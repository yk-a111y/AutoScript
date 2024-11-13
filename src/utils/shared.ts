export const tasks = {
  trigger: {
    name: 'Trigger',
    description: 'Block where workflow will start executing',
    icon: 'riFlashlightLine',
    component: 'BlockBasic',
    editComponent: 'EditTrigger',
    category: 'general',
    inputs: 0,
    outputs: 1,
    allowedInputs: true,
    maxConnection: 1,
    refDataKeys: ['url'],
    data: {
      disableBlock: false,
      description: '',
      type: 'manual',
      interval: 60,
      delay: 5,
      date: '',
      time: '00:00',
      url: '',
      shortcut: '',
      activeInInput: false,
      isUrlRegex: false,
      days: [],
      contextMenuName: '',
      contextTypes: [],
      parameters: [],
      preferParamsInTab: false,
      observeElement: {
        selector: '',
        baseSelector: '',
        matchPattern: '',
        targetOptions: {
          subtree: false,
          childList: true,
          attributes: false,
          attributeFilter: [],
          characterData: false,
        },
        baseElOptions: {
          subtree: false,
          childList: true,
          attributes: false,
          attributeFilter: [],
          characterData: false,
        },
      },
    },
  },
  'execute-workflow': {
    name: 'Execute workflow',
    description: '',
    icon: 'riFlowChart',
    component: 'BlockBasic',
    category: 'general',
    editComponent: 'EditExecuteWorkflow',
    inputs: 1,
    outputs: 1,
    allowedInputs: true,
    maxConnection: 1,
    refDataKeys: ['globalData'],
    data: {
      disableBlock: false,
      executeId: '',
      workflowId: '',
      globalData: '',
      description: '',
      insertAllVars: false,
      insertAllGlobalData: false,
    },
  },
  'active-tab': {
    name: 'Active tab',
    description: "Set current tab that you're in as an active tab",
    icon: 'riWindowLine',
    component: 'BlockBasic',
    category: 'browser',
    disableEdit: true,
    inputs: 1,
    outputs: 1,
    allowedInputs: true,
    maxConnection: 1,
    data: {
      disableBlock: false,
    },
  },
  'new-tab': {
    name: 'New tab',
    description: 'Create a new tab',
    icon: 'riGlobalLine',
    component: 'BlockBasic',
    editComponent: 'EditNewTab',
    category: 'browser',
    inputs: 1,
    outputs: 1,
    allowedInputs: true,
    maxConnection: 1,
    refDataKeys: ['url', 'userAgent'],
    data: {
      disableBlock: false,
      description: '',
      url: '',
      userAgent: '',
      active: true,
      tabZoom: 1,
      inGroup: false,
      waitTabLoaded: false,
      updatePrevTab: false,
      customUserAgent: false,
    },
  },
};