(function () {
    'use strict';

    angular
        .module('playGround')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, $timeout) {

        $scope.positions = [
            {position: 'goalkeeper', cx: 255, cy: 155, color: 'red'},
            {position: 'left_wingman', cx: 100, cy: 50, color: 'blue'},
            {position: 'right_wingman', cx: 410, cy: 50, color: 'blue'},
            {position: 'pivot', cx: 255, cy: 20, color: 'dark-blue'},
            {position: 'left_backcourt', cx: 30, cy: 120, color: 'blue'},
            {position: 'center_backcourt', cx: 255, cy: 90, color: 'blue'},
            {position: 'right_backcourt', cx: 480, cy: 120, color: 'blue'}
        ];

        $scope.players = [
            {_id: '1', position: 'goalkeeper', number: '1', name: 'toto 1'},
            {_id: '2', position: 'left_wingman', number: '2', name: 'toto 2'},
            {_id: '3', position: 'right_wingman', number: '3', name: 'toto 3'},
            {_id: '4', position: 'left_backcourt', number: '4', name: 'toto 4'},
            {_id: '5', position: 'pivot', number: '5', name: 'toto 5'},
            {_id: '6', position: 'center_backcourt', number: '6', name: 'toto 6'},
            {_id: '7', position: 'right_backcourt', number: '7', name: 'toto 7'}
        ];

        var passes = [
            {from: '1', to: '2'},
            {from: '2', to: '3'},
            {from: '3', to: '5'},
            {from: '5', to: '4'}
        ];



        $scope.getCoord = function (id) {
            var c = $scope.positions.filter(function (pos) {
                var players = $scope.players.filter(function (p) {
                    return p._id === id;
                });
           //     console.log(pos.position, players, id, players[0].position);
                return pos.position === players[0].position;
            })[0];
            var coords = {x: c.cx, y: c.cy};
            console.log(c, coords)
            return coords;
        };

        $scope.getPlayerNum = function (pos) {
            var players = $scope.players.filter(function (p) {
                return p.position === pos;
            });
            if(players[0]) {
                return players[0].number;
            } else {
                return ''
            }
        };

        $scope.getPlayerName = function (pos) {
            var players = $scope.players.filter(function (p) {
                return p.position === pos;
            });
            if(players[0]) {
                return players[0].name;
            } else {
                return ''
            }
        };

        var path = SvgPath();
        for (var i = 0; i < passes.length; i++) {
            var p = passes[i];
            var from = $scope.getCoord(p.from);
            var to = $scope.getCoord(p.to);
            if (i === 0) {
                path.to(from.x, from.y).line(to.x, to.y);
            } else {
                path.line(from.x, from.y).line(to.x, to.y);

            }
        }
        $scope.path = path.str();
        $timeout( function(){
           var pathLine =  anime.path('#lineDrawing .lines path');
            var motionPath = anime({
                targets: '#lineDrawing .el',
                translateX: pathLine('x'),
                translateY: pathLine('y'),
                rotate: pathLine('angle'),
                easing: 'linear',
                duration: 2000,
                loop: true
            });
            var lineDrawing = anime({
                targets: '#lineDrawing .lines path',
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'linear',
                duration: 2000,
                delay: function(el, i) { return i * 250 },
                direction: 'normal',
                loop: true
            });
        }, 0 );
    }
})();
