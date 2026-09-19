import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import ListaItens from "./components/ListaItens/ListaItens";
import { colors } from "./components/colors";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProdutoItem } from "./interfaces/ProdutoItem";
import { DATA } from "./components/ListaItens/ListaItens";

const STORAGE_KEY = "shopping_list";

export default function App() {
  const [produtos, setProdutos] = useState<ProdutoItem[]>([]);
  const [carregado, setCarregado] = useState(false);
  useEffect(() => {
    async function carregar() {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        setProdutos(json !== null ? (JSON.parse(json) as ProdutoItem[]) : DATA);
      } catch (erro) {
        console.error("Erro ao carregar produtos", erro);
      } finally {
        setCarregado(true);
      }
    }
    carregar();
  }, []);
  useEffect(() => {
    if (!carregado) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(produtos)).catch(console.error);
  }, [produtos, carregado]);

  function adicionarProduto(nome: string){
    const nomeLimpo = nome.trim();
    if (!nomeLimpo) return;
    const novo: ProdutoItem = {
      id: Date.now().toString(),
      nome: nomeLimpo,
      comprado: false,
    };
    setProdutos((atual) => [...atual, novo]);
  }

  function alternarComprado(id: string){
    setProdutos((atual) =>
      atual.map((p) => (p.id === id ? {...p, comprado: !p.comprado}: p))
    );
  }
  
  function removerProduto(id: string){
    setProdutos((atual) => atual.filter((p) => p.id !== id));
  }

  function limparItens(comprados: boolean) {
  setProdutos((atual) => atual.filter((p) => p.comprado !== comprados));
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Header />
        <Form onAdicionar={adicionarProduto}/>
        <ListaItens produtos={produtos} onAlternar={alternarComprado} onRemover={removerProduto} onLimpar={limparItens}/>
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
