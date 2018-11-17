// Author : Vivek Mehra

$(document).ready(function(){
    $.getJSON("data.json", function(data) {

        // main function for each STEP
        function processStep(level, isNewBreadcrumb, parentName, subTree) {
            console.log("");
            console.log("in processStep() : #" + level);

            console.log("args: " + arguments[0] + "*" + arguments[1] + "*" + arguments[2] + "*" + arguments[3] + "*" +
            arguments[4] + "*" + arguments[5]);

            console.log(subTree);

            level_label = level + 1;
            $("#label").text("STEP " + level_label);

            // clear list items
            $("#list").html("");

            console.log("hasChildren: " + subTree.hasOwnProperty('children')); //d
            console.log("parentName: " + parentName);
            console.log("isNewBreadcrumb: " + isNewBreadcrumb);

            if (isNewBreadcrumb) {
                console.log("inside IF");
                breadcrumbCount = level - 1;

                $("#header span.outer").last().removeClass('special');
                $("#header").append('<span class="outer" id="S'+ breadcrumbCount + '"><span>' + parentName + '</span></span>');
                $("#header span.outer").last().addClass('special');

                // add event listener
                $("span#S" + breadcrumbCount).on("click", {
                    "breadcrumbCount":breadcrumbCount,
                    "level": level,
                    "subTree": subTree
                }, function (event) {
                    $(this).addClass('special');

                    // remove span elements
                    console.log("###########################");

                    console.log("clicked id: " + $(this).attr('id'));
                    console.log("event data: " + JSON.stringify(event.data));

                    $(this).nextAll().remove();
                    processStep(level, false, undefined, event.data.subTree);
                });
            }

            $.each(subTree, function (i, item) {
                console.log(i + " : " + item);

                if (item.hasOwnProperty('children')) {
                    console.log("OK");
                    $("#list").append('<li class="items isLink" id="' + i + '">'+ item.name + '</li>');
                } else {
                    console.log("no child");
                    $("#list").append('<li class="items" id="' + i + '">'+ item.name + '</li>');
                }
            });

            $("li.isLink").on("click", {"subtree" : subTree}, function(event) {
                var idChar = $(this).attr('id');
                processStep(level + 1, true, event.data.subtree[parseInt(idChar)].name, event.data.subtree[parseInt(idChar)].children);
            });
        }

        processStep(0, false, undefined, data);


    });




});

