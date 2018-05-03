myApp.directive('fileDropzone', function() {
    return{
        restrict: 'A',
        scope: {
            filesToUpload: '='
        },
        link: function(scope, element, attributes) {
            element.bind('dragover', function(e) {
                if (e != null) {
                    e.preventDefault();
                }
                ;
                e.dataTransfer.effectAllowed = 'copy';
                element.attr('class', 'file-drop-zone-over');
            });
            element.bind('dragenter', function(e) {
                if (e != null) {
                    e.preventDefault();
                }
                ;
                e.dataTransfer.effectAllowed = 'copy';
                element.attr('class', 'file-drop-zone-over');
            });
            element.bind('drop', function(e) {
                element.attr('class', 'file-drop-zone-over');
                if (e != null) {
                    e.preventDefault();
                }
                ;
                var fileObjectArray = [];
                angular.forEach(e.dataTransfer.files, function(file) {
                    //for the seek of previewing the fileson the page before uploading them to the server
                    var reader = new fileReader();
                    reader.onload = function(e) {
                        scope.$apply(function() {
                            var newFilePreview = e.target.result;
                            var newFileName = file.name;
                            var newFileSize = file.size;
                            var fileObject = {
                                file: file,
                                mame: newFileName,
                                size: newFileSize,
                                preview: newFilePreview,
                            };
                            fileObjectArray.push(fileObject);
                        });
                    };
                    reader.readAsDataURL(file);
                });
                scope.filesToUpload = fileObjectArray;
            });
        }

    };
});


