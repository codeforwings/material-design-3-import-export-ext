await runner.runStep({
  type: 'navigate',
  url: 'chrome://downloads/',
  assertedEvents: [
    {
      type: 'navigation',
      url: 'chrome://downloads/',
      title: 'Downloads'
    }
  ]
});
