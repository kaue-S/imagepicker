import { StatusBar } from "expo-status-bar";
import { Button, View, Image, Text } from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  //State tradicional para armazenarf a referência da foto (quando existir)
  const [foto, setFoto] = useState(null);

  //State de checagem de permissão de uso (através do hook useCameraPermission)
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => {
    async function verificaPermissoes() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(cameraStatus === "granted");
    }

    verificaPermissoes();
  }, []);

  //Ao pressionar o botão, executa esta função
  const escolherFoto = async () => {
    //Acessando via ImagePicker a biblioteca para a seleção de apenas imagens, com recursos de edição habilitado, proporção de 16,9 e qualidade total.
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].url);
    }
  };
  console.log(foto);

  return (
    <>
      <StatusBar />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Escolher foto" onPress={escolherFoto} />
        {foto ? (
          <Image source={{ uri: foto }} style={{ width: 300, height: 300 }} />
        ) : (
          <Text>Sem foto!</Text>
        )}
      </View>
    </>
  );
}
