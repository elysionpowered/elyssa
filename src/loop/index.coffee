define 'elyssa/loop', ['requestanimationframe'], (requestAnimationFrame) ->
  'use strict'
  
  # Elyssa.Loop
  # Static class
  class Loop
    taskList = {}
    isRunning = true
    
    {staticProperty} = window.ClassHelper(@)
    
    # @property {String<Array>} All names of tasks as an array
    staticProperty tasks:
      get: -> Object.keys(taskList)
    
    # Runs the tasks
    #
    # @return {Object} The Elyssa.Loop object
    @run: ->
      time = 0
      
      animLoop = ->
        requestAnimationFrame animLoop
        
        now = Date.now()
        dt = now - (time or now)
        
        time = now
        
        return unless isRunning
        
        for key, value of taskList
          value.value?(dt) unless value.paused
        
        null
      
      animLoop()
      
    # Pauses all tasks
    #
    # @return {Object} The Elyssa.Loop object
    @pause: ->
      isRunning = false
      
      @
      
    # Resumes all tasks
    #
    # @return {Object} The Elyssa.Loop object
    @resume: ->
      isRunning = true
      
      @
      
    # Deletes all tasks
    #
    # @return {Object} The Elyssa.Loop object
    @clear: ->
      taskList = {}
      
      @
    
    # Adds a task
    #
    # @param {String} The name of a task
    # @param {Function} The task function
    #
    # @return {Object} The Elyssa.Loop object
    @addTask: (taskName, taskFunction) ->
      return if taskList[taskName]
      
      taskList[taskName] =
        paused: false
        value: taskFunction
        
      @
    
    # Pauses a specific task
    #
    # @param {String} The name of the task that will be paused
    #
    # @return {Object} The Elyssa.Loop object
    @pauseTask: (taskName) ->
      taskList[taskName].paused = true
      
      @
      
    # Resumes a specific task
    #
    # @param {String} The name of the task that will be resumed
    #
    # @return {Object} The Elyssa.Loop object
    @resumeTask: (taskName) ->
      taskList[taskName].paused = false
      
      @
      
    # Removes a specific task
    #
    # @param {String} The name of the task that will be deleted
    #
    # @return {Object} The Elyssa.Loop object
    @removeTask: (taskName) ->
      delete taskList[taskName] if taskList[taskName]
      
      @
    