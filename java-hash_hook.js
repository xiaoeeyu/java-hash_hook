function hookCRC32(){
    if(Java.available){
        Java.perform(function(){
            var CRC32 = Java.use('java.util.zip.CRC32');
            CRC32.update.overload('[B').implementation = function(bytes){
                console.log('CRC32->update: ' + JSON.stringify(bytes));
                var StringClass = Java.use('java.lang.String');
                var str = StringClass.$new(bytes);
                console.log('CRC32->update str: ' + str);
                var result = this.update(bytes);
                return result;
            }
            CRC32.getValue.implementation = function(){
                var result = this.getValue();
                console.log('CRC32->getValue: ' + result);
                return result;
            }
            })
    }
}

function hookMD5andsha(){
    if(Java.available){
        Java.perform(function(){
            var MessageDigestClass = Java.use('java.security.MessageDigest');
            MessageDigestClass.getInstance.overload('java.lang.String').implementation = function(arg0){
                console.log('MessageDigest->getInstance: ' + arg0);
                var result = this.getInstance(arg0);
                return result;
            }
            // MessageDigestClass.digest.overload('[B').implementation = function(bytes){
            //     console.log('MessageDigest->digest: ' + JSON.stringify(bytes));
            //     // var StringClass = Java.use('java.lang.String');
            //     // var str = StringClass.$new(bytes);
            //     // console.log('MessageDigest->digest str: ' + str);
            //     var result = this.digest(bytes);
            //     return result;
            // }
            MessageDigestClass.update.overload('[B').implementation = function(arg0){
                console.log('MessageDigest->update: ' + JSON.stringify(arg0));
                var result = this.update(arg0);
                return result;
            }
        })
    }
}

function main(){
    // hookCRC32();
    hookMD5andsha();
}

setImmediate(main);
