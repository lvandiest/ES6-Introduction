/**
 * @ngdoc directive
 * @name Es6App.directive:codeMirror
 * @restrict EA
 * @param {String} id ID of the editor.
 * @param {Boolean} showRunButton Enables or disables the button that runs the code in the editor. Default is 'true'.
 * @element textarea
 * 
 * @description 
 * Directive that turns a textarea into a codeMirror javascript editor and adds a button to run the code in the editor.
 * 
 * @example
    <example module="Es6App">
        <file name="example.html">
            <div>
                <textarea id="foo" code-mirror>
function foo(a,b) {
    return b*b;
}

console.log(foo(2,4));
                </textarea>
            </div>
        </file
    </example>
 */

(function() {
    'use strict';

    angular
        .module('Es6App')
        .directive('codeMirror', codeMirror);

    function codeMirror() {
        
        var directive = {
            bindToController: true,
            controller: codeMirrorController,
            controllerAs: 'vm',
            transclude: true,
            replace: true,
            scope: {
                id: '@',
                showRunButton: '@'
            },
            template:   '<div class="code-editor">' +
                        '   <hr ng-hide="vm.showRunButton === \'false\'" />' + 
                        '   <button ng-hide="vm.showRunButton === \'false\'" class="btn btn-primary" ng-click="vm.runCode()">Run code</button>' +
                        '</div>',
            link: link
        };
        
        return directive;
        
        function link (scope, element, attrs, ctrl, transclude) {
            // Add a new textarea element with the content of the original element. If we use transclude Angular will wrap the content in a span, and we don't want that.
            transclude(function(clone) {
                element.prepend('<textarea id="editor-' + attrs.id + '">' + clone.html() + '</textarea>');
            });
        }
        
    }
    
    codeMirrorController.$inject = ['$element', '$timeout'];
    function codeMirrorController ($element, $timeout) {
        
        var vm = this;
        
        vm.runCode = runCode;
        vm.editor = null;
        
        activate();
        
        ////////////////
        
        // Run the code in the editor.
        function runCode() {
            eval(vm.editor.getValue());
        }
        
        // Turn the textarea into a CodeMirror editor
        function activate() {
            // Timeout to make sure it waits until the template is rendered
            $timeout(function() {
                vm.editor = CodeMirror.fromTextArea(document.getElementById('editor-' + vm.id), {
                    lineNumbers: true,
                    mode: "javascript",
                    theme: 'material',
                    autoRefresh: true
                });
            });
        }
        
    }
    
})();