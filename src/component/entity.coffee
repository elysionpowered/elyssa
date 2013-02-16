do (window = @, Elyssa = @Elyssa or= {}) ->
  'use strict'
  
  class Elyssa.Entity
    functionList = {}
  
    constructor: (@name = @constructor.name) ->
      @components = {}
      functionList = {}
  
    add: (component) ->
      return @ unless component
  
      componentName = component.name
      componentInstance = @components[componentName]
  
      unless componentInstance
        componentInstance = component
        componentInstance.register?()
        
        for key, value of componentInstance
          continue if key is 'constructor'
  
          if typeof value is 'function'
            functionList[key] = [] unless functionList[key]
            functionList[key].push(value)
  
            unless @[key]
              @[key] = ((key) -> 
                 (->
                  functions.apply(this, arguments) for functions in functionList[key]
                  @)
              )(key)
  
      @
      
    remove: (componentName) ->
      if @components[componentName]
        @components[componentName].unregister?()
        delete @components[componentName]
  
      @
  
    render: ->
      for key, value of @components
        value.render?()
  
      @
    update: (dt) ->
      for key, value of @components
        value.update?(dt)
  
      @