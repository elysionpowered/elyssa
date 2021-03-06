do (window = @) ->
  'use strict'
  
  ###
    Console object fixes
  ###
  noop = ->

  methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn']

  console = (window.console or= {})

  for i in methods
    method = methods[i]
    
    console[method] or= noop