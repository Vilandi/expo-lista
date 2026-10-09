import { CircleCheckBig, CircleDashed } from "lucide-react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import { ProdutoItem } from "../../interfaces/ProdutoItem";
import ProdutoListaItem from "../ProdutoListaItem/ProdutoListaItem";
import { colors } from "../colors";

interface Props {
  produtos: ProdutoItem[];
  onAlternar: (id: string) => void;
  onRemover: (id: string) => void;
  onLimpar: (comprados: boolean) => void;
}
export default function ListaItens({ produtos, onAlternar, onRemover, onLimpar }: Props) {
  const [active, setActive] = useState("presentes");
  const mostrarComprados = active === "comprados";
  const itensVisiveis = produtos.filter((p) => p.comprado === mostrarComprados);

  function alterarActiveParaPresentes() {
    setActive("presentes");
  }

  function alterarActiveParaComprados() {
    setActive("comprados");
  }

  return (
    <View style={styles.container}>
      {/* Filtro */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.buttonTopBar}
          onPress={alterarActiveParaPresentes}
        >
          <CircleDashed
            color={active === "presentes" ? colors.azul500 : colors.textSecondary}
          />
          <Text
            style={{
              color: active === "presentes" ? colors.azul500 : colors.textSecondary,
            }}
          >
            Presentes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonTopBar}
          onPress={alterarActiveParaComprados}
        >
          <CircleCheckBig
            color={active === "comprados" ? colors.azul500 : colors.textSecondary}
          />
          <Text
            style={{
              color: active === "comprados" ? colors.azul500 : colors.textSecondary,
            }}
          >
            Comprados
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() => onLimpar(mostrarComprados)}
          // TODO(aluno): implementar a ação de "Limpar" (ex.: remover os itens marcados como comprados, atualizando o estado da lista).
        >
          <Text style={{ color: colors.textSecondary }}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de itens */}
      {/* TODO(aluno): filtrar DATA/produtos de acordo com "active" (produto.comprado === false para "presentes", === true para "comprados") antes de passar para a FlatList. */}
      <FlatList<ProdutoItem>
        data={itensVisiveis}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={(linha) => (
          <ProdutoListaItem
            produto={linha.item}
            onAlternar={onAlternar}
            onRemover={onRemover}
          />
        )}
      />
    </View>
  );
}