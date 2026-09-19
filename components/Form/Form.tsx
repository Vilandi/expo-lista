import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Check } from "lucide-react";
import { colors } from "../colors";
import { useState } from "react";

interface Props {
  onAdicionar: (nome: string) => void;
}

export default function Form({ onAdicionar }: Props) {
  const [texto, setTexto] = useState("");

  function handleAdicionar(){
    if (!texto.trim()) return;
    onAdicionar(texto);
    setTexto("");
  }
  
  return (
    <View style={styles.container}>
      {/* TODO(aluno): controlar o valor deste campo com useState (ex.: const [texto, setTexto] = useState("")) para poder usá-lo ao adicionar um novo item. */}
      <TextInput
        style={styles.input}
        placeholder="O que você precisa comprar?"
        value={texto}
        onChangeText={setTexto}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleAdicionar}
        // TODO(aluno): ao tocar, adicionar um novo produto à lista (ex.: chamando uma função recebida via props que atualiza o estado da lista em ListaItens/App).
      >
        <Check color={colors.surface} size={16} />
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}
