import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import ImagePicker from 'react-native-image-picker';
import React from 'react';

const cloudinaryName = "dcf8t0wl3"
const preset = "vq2xrvht"

export default class Cameraex extends React.Component {
//   state = {
//     hasCameraPermission: null,
//     type: Camera.Constants.Type.back,
//     currentPhoto:""

//   };


constructor(props) {
    super(props)
    this.state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        currentPhoto: "",
        avatarSource: null,
        uploadingImage: false
    }
    this.submit = this.submit.bind(this)
};


  submit () {
    var options = {
        title: 'Select Avatar',
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };

    ImagePicker.showImagePicker(options, (response) => {


        if (response.didCancel) {
            console.log('User cancelled image picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            let source = { uri: response.uri };
            this.setState({
                uploadingImg: true
            });
            uploadFile(response)
                .then(response => response.json())
                .then(result => {
                    this.setState({
                        avatarSource: { uri: result.secure_url },
                        uploadingImg: false
                    });
                })

        }
    });
}
async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
}

uploadFile = (file) => {
    console.log('uploadFile fired')
    console.log(file);

   return fetch('https://api.cloudinary.com/v1_1/' + cloudinaryName  + '/image/upload?upload_preset=' + preset,  {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        // body: JSON.stringify({
        //   firstParam: 'yourValue',
        //   secondParam: 'yourOtherValue',
        // }),
        body: file
    
        
    })
        .then( res => res.json())
        .then( data => {
            console.log('CLOUDINARY RESPONSE:')
            console.log(data);
        })
        .catch( err => {
            console.log(err);
        })
    ;
    // return RNFetchBlob.fetch('POST', 'https://api.cloudinary.com/v1_1/' + YOUR_CLOUDINARY_NAME , {
    //     'Content-Type': 'multipart/form-data'
    // }, [
    //         { name: 'file', filename: file.fileName, data: RNFetchBlob.wrap(file.origURL) }
    //     ]).then((res) => console.error(res.json()))

}

takePicture = () => {
    console.log('attempting picture');
    if (this.camera) {
        this.camera.takePictureAsync()
            .then(img => {
                console.log('SNAP!!!!');
                console.log(img);
                /* 
                this.setState({
                    currentPhoto: data.uri
                })
                this.uploadPhoto(this.state.currentPhoto) 
    
                or 
    
                this.uploadPhoto(data.uri);
                */

                const data = new FormData();
                data.append('file', {
                    uri: img.uri,
                    type: 'image/jpeg', // or photo.type
                    name: 'testPhotoName'
                });

                console.log('**', this)

                this.uploadFile(data)
               
         
            })
            .catch(error => {
                console.log(error);
            })
    }
}


  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

//   takePicture = () => {
//     console.log('attempting picture');
//     if (this.camera) {
//       this.camera.takePictureAsync()
//         .then( data => {
//             console.log('SNAP');
//             console.log(data);
//             /* 
//             this.setState({
//                 currentPhoto: data.uri
//             })
//             this.uploadPhoto(this.state.currentPhoto) 

//             or 

//             this.uploadPhoto(data.uri);
//             */
//         })
//         .catch( error =>{
//             console.log(error);
//         })
//     }
//   };



  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <Text>I NEVER TRIED</Text>
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
          <View style={{ flex: 1 }}>
          <Text>CAMERA ON
          </Text>
          <Camera ref={ref => {this.camera = ref}}     style={{
                  flex: 0.1,
                  width:400,
                  height:400,
                  alignItems: 'center',
                }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>

       <View style={{ flex: 0.4 }}>
       <TouchableOpacity
          onPress={() => { this.takePicture() }}
          style={{ alignSelf: 'center' }}
        >
          <Ionicons name="ios-radio-button-on" size={70} color="white" />
        </TouchableOpacity>
      </View> 
            </View>
          </Camera>
        </View>
      );
    }
  }
}