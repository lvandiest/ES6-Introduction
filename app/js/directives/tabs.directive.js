/**
 * @ngdoc directive
 * @name Es6App.directive:tabs
 * @restrict EA
 * 
 * @description 
 * Directive that creates bootstrap tabs.
 * 
 * @example
    <example module="Es6App">
        <file name="example.html">
            <tabs>
                <pane title="First pane">
                    <p>Content of the first pane!</p>
                </pane>
                <pane title="Second pane">
                    <p>Content of the second pane!</p>
                </pane>
                <pane title="Third pane">
                    <p>Content of the third pane!</p>
                </pane>
            </tabs>
        </file
    </example>
 */

(function() {
    'use strict';

    angular
        .module('Es6App')
        .directive('tabs', tabs);
    
    function tabs() {
        
        var directive = {
            bindToController: true,
            controller: tabsController,
            controllerAs: 'vm',
            restrict: 'EA',
            transclude: true,
            scope: {},
            template:
            '<div class="tabbable">' +
            '   <ul class="nav nav-tabs">' +
            '       <li ng-repeat="pane in vm.panes" ng-class="{active:pane.selected}">'+
            '           <a href="" ng-click="vm.selectPane(pane)">{{pane.title}}</a>' +
            '       </li>' +
            '   </ul>' +
            '   <div class="tab-content" ng-transclude></div>' +
            '</div>',
            replace: true
        };
        
        return directive;
        
    }
    
    tabsController.$inject = ['$scope'];
    function tabsController ($scope) {
        
        var vm = this;
        
        vm.addPane = addPane;
        vm.selectPane = selectPane;
        vm.panes = [];
 
        ////////////////
 
        function selectPane(pane) {
            angular.forEach(vm.panes, function(pane) {
                pane.selected = false;
            });
            pane.selected = true;
        }
 
        function addPane(pane) {
          if (vm.panes.length === 0) {
              vm.selectPane(pane);
          } 
          vm.panes.push(pane);
        }
        
    }
    
})();



/**
 * @ngdoc directive
 * @name Es6App.directive:pane
 * @restrict EA
 * @requires Es6App.directive:tabs
 * @param {String} title Title of the pane.
 * 
 * @description 
 * Directive for creating a pane inside the tabs.
 * 
 * @example
    <example module="Es6App">
        <file name="example.html">
            <tabs>
                <pane title="First pane">
                    <p>Content of the first pane!</p>
                </pane>
                <pane title="Second pane">
                    <p>Content of the second pane!</p>
                </pane>
                <pane title="Third pane">
                    <p>Content of the third pane!</p>
                </pane>
            </tabs>
        </file
    </example>
 */

(function() {
    'use strict';

    angular
        .module('Es6App')
        .directive('pane', pane);
    
    function pane() {
        
        var directive = {
            require: '^tabs',
            restrict: 'EA',
            transclude: true,
            scope: {
                title: '@'
            },
            link: link,
            template: 
            '<div>' +
            '   <div class="tab-pane" ng-show="selected" ng-class="{active: selected}" ng-transclude></div>' + 
            '</div>',
            replace: true
        };
        
        return directive;
        
        function link (scope, element, attrs, tabsCtrl) {
            tabsCtrl.addPane(scope);
        }
        
    }
    
})();