import React, { useState } from 'react';
import { Alert, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
    Container,
    Background,
    Input,
    Button,
    TextButton,
    CaptureButton,
    ImageCaptured,
} from './styles';

export default function ConfirmDelivery({ navigation: { navigate }, route }) {
    const { id } = route.params;
    const [cameraCurrent, setCameraCurrent] = useState();
    const [photo, setPhoto] = useState(0);
    const [visible, setVisible] = useState(false);

    async function handleTakeSignature() {
        try {
            const options = {
                quality: 0.5,
                base64: false,
                forceUpOrientation: true,
                fixOrientation: true,
            };

            const data = await cameraCurrent.takePictureAsync(options);

            setPhoto(data);
            setVisible(!visible);
        } catch (err) {
            Alert.alert('Falha', 'Erro ao capturar foto!');
        }
    }

    async function handleSubmit() {
        try {
            const data = new FormData();

            data.append('file', {
                uri: photo.uri,
                name: `signature${id}.jpg`,
                type: 'image/jpg',
            });

            const response = await api.post(`/file/create`, data);

            await api.put(`/delivery/${id}/close-delivery`, {
                end_date: '2020-04-17T14:00:00',
                signature_id: response.data.id,
            });

            Alert.alert(
                'Sucesso',
                'Assinatura enviada com sucesso!',
                [{ text: 'OK', onPress: () => navigate('Dashboard') }],
                { cancelable: false }
            );
        } catch (err) {
            Alert.alert(
                'Error',
                'Erro ao capturar assinatura, tente novamente!'
            );
        }
    }

    return (
        <>
            <Background />
            <Container>
                <Input>
                    {photo !== 0 ? (
                        <ImageCaptured
                            visible={visible}
                            source={{ uri: photo.uri }}
                        />
                    ) : (
                        <RNCamera
                            ref={(camera) => setCameraCurrent(camera)}
                            style={{
                                marginTop: 85,
                                height: 200,
                                alignItems: 'center',
                            }}
                            type={RNCamera.Constants.Type.back}
                            autoFocus={RNCamera.Constants.AutoFocus.on}
                            flashMode={RNCamera.Constants.FlashMode.off}
                            captureAudio={false}
                            androidCameraPermissionOptions={{
                                title: 'Permissão para usar a câmera',
                                message:
                                    'Este app necessita da câmera para esta funcionalidade.',
                                buttonPositive: 'Permitir',
                                buttonNegative: 'Cancelar',
                            }}
                        />
                    )}
                </Input>

                <CaptureButton visible={!visible} onPress={handleTakeSignature}>
                    <Icon name="photo-camera" size={30} color="#fff" />
                </CaptureButton>

                <Button onPress={handleSubmit}>
                    <TextButton>Enviar</TextButton>
                </Button>
            </Container>
        </>
    );
}

ConfirmDelivery.navigationOptions = {
    headerTitle: 'Confirmar entrega',
    headerTitleAlign: 'center',
};
