var mainApp = angular.module("mainApp", ['ngSanitize'])
.config(function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

});

mainApp.run(function() {
});

mainApp.controller('myController', function($scope,$http,$location) {

    $scope.book    = $location.search().book?$location.search().book:1;
    $scope.perek   = $location.search().perek?$location.search().perek:1;

    var commentUrl = "comments/"+$scope.book+"_"+$scope.perek+".js";
    var sourceUrl  = "source/"+$scope.book+"_"+$scope.perek+".json";

    var prakim_number = [ 50,40,27,36,34];

    $scope.digit_heb = [ "א", "ב" ,"ג", "ד","ה","ו","ז","ח","ט","י","יא", "יב" ,"יג", "יד","טו","טז","יז","יח","יט","כ","כא","כב","כג","כד","כה","כו","כז","כח","כט", "ל","לא","לב","לג","לד","לה","לו","לז","לח","לט","מ","מא","מב","מג","מד","מה","מו","מז","מח","מט","נ","נא","נב","נג"];

    // parasha [book][parasha_name][perek_start][perek_end][passouk_start]

    $scope.parasha = [
        [["בראשית", 1, 6,1], ["נח",6,11,9], ["לך לך", 12, 17,1],["וירא", 18, 22,1], ["חיי שרה",23,25,1],["תולדות",25,28], ["ויצא", 28, 32,1], ["וישלח", 28, 36,1],["וישב", 37, 40,1], ["מקץ",41,44,1], ["ויגש", 44, 47,1],["ויחי", 47, 50,1]],
        [["שמות", 1,6,1]  , ["וארא", 6, 9,1]  , ["בא", 10,13,1],["בשלח", 13, 17,1]  , ["יתרו", 18, 20,1]  , ["משפטים", 21,24,1],["תרומה", 25, 27,1]  , ["תצוה", 27, 30,1]  , ["כי תישא", 30,35,1],["ויקהל", 35, 38,1], ["פקודי", 38, 40,1]],
        [["ויקרא", 1, 5,1]  , ["צו", 6, 8,1]  , ["שמיני", 9,11,1],["תזריע", 12, 13,1]  , ["מצורע", 14, 15,1]  , ["אחרי מות", 16,18,1],["קדושים", 19, 20,1]  , ["אמר", 21, 24,1]  , ["בהר", 25,26,1],["בחקתי", 26, 27,1]],
        [["במדבר", 1, 4,1]  , ["נשא", 4, 7, 1]  , ["בהעלותך", 8,12,1],["שלח", 13, 15,1]  , ["קורח", 16, 18,1]  , ["חוקת", 19,22,1],["בלק", 22, 25,1]  , ["פינחס", 25, 30,1]  , ["מטות", 30,32,1],["מסעי", 33, 36,1]],
        [["דברים", 1, 3,1]  , ["ואתחנן", 3, 7,1]  , ["עקב", 7,11,1],["ראה", 11, 16,1]  , ["שפטים", 16, 21,1]  , ["כי תצא", 21,25,1],["כי תבוא", 26, 29,1]  , ["ניצבים", 29, 30,1]  , ["וילך", 31,31,1],["האזינו", 32, 32,1], ["וזאת הברכה", 33, 34,1]]
    ];

    var getParasha =  function (book, perek){
        var para = " ";
        for(var x=0; x<$scope.parasha[book-1].length;x++){
            if (perek >= $scope.parasha[book-1][x][1] && perek <= $scope.parasha[book-1][x][2]){
                para += " "+$scope.parasha[book-1][x][0];
            }
        }
        para += " ";
        return para;
    };

    $scope.parasha = getParasha($scope.book,$scope.perek);

    console.log("parasha",$scope.parasha);

        $http({method:"GET",url:commentUrl})
        .then(function(comments) {

            $scope.comments = comments.data;

            $http({method:"GET",url:sourceUrl})
                .then(function(source) {

                    $scope.source = source.data[0];

                    angular.forEach($scope.comments, function (item) {
                        if (item.content) {
                            item.content = item.content.replace(/#/g, "<br/>");
                            item.content = item.content.replace(/\[/g, "<strong>");
                            item.content = item.content.replace(/\]/g, "</strong>");
                        }
                    });
                });
        });
});