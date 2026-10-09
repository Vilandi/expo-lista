import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import ListaItens from "./components/ListaItens/ListaItens";
import { colors } from "./components/colors";
import { useEffect, useState } from "react";
import { ProdutoItem } from "./interfaces/ProdutoItem";
import {
  atualizarProduto,
  criarProduto,
  observarProdutos,
  removerProduto,
  removerProdutos,
} from "./src/produtos";

export default function App() {
  const [produtos, setProdutos] = useState<ProdutoItem[]>([]);

  // Assina a coleção "produtos": a tela atualiza sozinha a cada mudança.
  useEffect(() => {
    const cancelar = observarProdutos(setProdutos, (erro) =>
      console.error("Erro ao observar produtos", erro)
    );
    return cancelar;
  }, []);

  async function adicionarProduto(nome: string) {
    const nomeLimpo = nome.trim();
    if (!nomeLimpo) return;
    try {
      await criarProduto(nomeLimpo);
    } catch (erro) {
      console.error("Erro ao criar produto", erro);
    }
  }

  async function alternarComprado(id: string) {
    const produto = produtos.find((p) => p.id === id);
    if (!produto) return;
    try {
      await atualizarProduto(id, produto.nome, !produto.comprado);
    } catch (erro) {
      console.error("Erro ao atualizar produto", erro);
    }
  }

  async function remover(id: string) {
    try {
      await removerProduto(id);
    } catch (erro) {
      console.error("Erro ao remover produto", erro);
    }
  }

  async function limparItens(comprados: boolean) {
    const ids = produtos.filter((p) => p.comprado === comprados).map((p) => p.id);
    try {
      await removerProdutos(ids);
    } catch (erro) {
      console.error("Erro ao limpar itens", erro);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Header />
        <Form onAdicionar={adicionarProduto}/>
        <ListaItens produtos={produtos} onAlternar={alternarComprado} onRemover={remover} onLimpar={limparItens}/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
