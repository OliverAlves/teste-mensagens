import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, Button } from "react-native";
import { AppProvider, useAppContext } from "./AppContext";
import { useChatClient } from "./useChatClient";

import {
  OverlayProvider,
  Chat,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
  Streami18n,
} from "stream-chat-expo"; // Or stream-chat-expo
import { StreamChat } from "stream-chat";
import { chatApiKey, chatUserId } from "./chatConfig";
import "dayjs/locale/pl";

import { db } from "./firebase_config";
import { collection, query, where, getDocs } from "firebase/firestore";

import Home from "./paginas/Home";
import GerarOcamento from "./paginas/GerarOcamento";
import Login from "./paginas/Login";

const Stack = createStackNavigator();

const filters = {
  members: {
    $in: [chatUserId],
  },
};
const sort = {
  last_message_at: -1,
};

const ChannelListScreen = (props) => {
  const { setChannel } = useAppContext();

  return (
    <ChannelList
      style={{
        zIndex: 1,
      }}
      onSelect={(channel) => {
        const { navigation } = props;
        setChannel(channel);
        navigation.navigate("ChannelScreen");
      }}
      filters={filters}
      sort={sort}
    />
  );
};

const ChannelScreen = (props) => {
  const { channel } = useAppContext();
  const [orcamento, setOrcamento] = useState("");
  const [codigoFirebase, setCodigoFirebase] = useState("");

  const buscarDadosChamado = async () => {
    const q = query(
      collection(db, "orcamentos"),
      where("codigo_stream", "==", channel.id)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("sem Resultado");
      return;
    }
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setOrcamento(doc.data());
      setCodigoFirebase(doc.id);
    });
  };

  useEffect(() => {}, []);

  return (
    <Channel channel={channel}>
      <MessageList />
      {/* <Button
        onPress={() => {
          const { navigation } = props;
          navigation.navigate("GerarOrcamento", {
            canal: channel.id,
            valorAtual: orcamento.valor,
            codigo_stream: orcamento.codigo_stream,
            codigoFirebase: codigoFirebase,
          });
        }}
        title={orcamento === "" ? "Adicinar Orçamento" : "Alterar Orçamento"}
      />
      {orcamento != "" > 0 && (
        <Text>Orcamento no valor de R${orcamento.valor}</Text>
      )} */}

      <MessageInput />
    </Channel>
  );
};

const NavigationStack = () => {
  const { clientIsReady } = useChatClient();
  const chatClient = StreamChat.getInstance(chatApiKey);
  const streami18n = new Streami18n();
  streami18n.registerTranslation(
    "pl",
    {
      "1 Reply": "1 Reply",
      "1 Thread Reply": "1 Thread Reply",
      "Allow access to your Gallery": "Allow access to your Gallery",
      "Also send to channel": "Also send to channel",
      "Are you sure you want to permanently delete this message?":
        "Are you sure you want to permanently delete this message?",
      "Block User": "Block User",
      Cancel: "Cancel",
      "Cannot Flag Message": "Cannot Flat Message",
      "Copy Message": "Copy Message",
      Delete: "Delete",
      "Delete Message": "Delete Message",
      "Do you want to send a copy of this message to a moderator for further investigation?":
        "Do you want to send a copy of this message to a moderator for further investigation?",
      "Edit Message": "Edit Message",
      "Editing Message": "Editing Message",
      "Emoji matching": "Emoji matching",
      "Empty message...": "Empty message...",
      "Error loading": "Error loading",
      "Error loading channel list...": "Error loading channel list...",
      "Error loading messages for this channel...":
        "Error loading messages for this channel...",
      "Error while loading, please reload/refresh":
        "Error while loading, please reload/refresh",
      "File type not supported": "File type not supported",
      Flag: "Flag",
      "Flag Message": "Flag Message",
      "Flag action failed either due to a network issue or the message is already flagged":
        "Flag action failed either due to a network issue or the message is already flagged.",
      "Instant Commands": "Instant Commands",
      "Links are disabled": "Links are disabled",
      "Loading channels...": "Loading channels...",
      "Loading messages...": "Loading messages...",
      "Loading...": "Loading...",
      "Message Reactions": "Message Reactions",
      "Message deleted": "Message deleted",
      "Message flagged": "Message flagged",
      "Mute User": "Mute User",
      "Not supported": "Not supported",
      "Nothing yet...": "Nothing yet...",
      Ok: "Ok",
      "Only visible to you": "Only visible to you",
      Photo: "Photo",
      Photos: "Photos",
      "Photos and Videos": "Photos and Videos",
      "Pin to Conversation": "Pin to Conversation",
      "Please enable access to your photos and videos so you can share them.":
        "Please enable access to your photos and videos so you can share them.",
      "Please select a channel first": "Please select a channel first",
      "Reconnecting...": "Reconnecting...",
      Reply: "Reply",
      "Reply to Message": "Reply to Message",
      Resend: "Resend",
      "Search GIFs": "Search GIFs",
      "Send a message": "Send a message",
      "Sending links is not allowed in this conversation":
        "Sending links is not allowed in this conversation",
      "Slow mode ON": "Slow mode ON",
      "The message has been reported to a moderator.":
        "The message has been reported to a moderator.",
      "Thread Reply": "Thread Reply",
      "Unblock User": "Unblock User",
      "Unknown User": "Unknown User",
      "Unmute User": "Unmute User",
      "Unpin from Conversation": "Unpin from Conversation",
      "Unread Messages": "Unread Messages",
      Video: "Video",
      You: "Você",
      "You can't send messages in this channel":
        "You can't send messages in this channel",
      "{{ firstUser }} and {{ nonSelfUserLength }} more are typing":
        "{{ firstUser }} and {{ nonSelfUserLength }} more are typing",
      "{{ index }} of {{ photoLength }}": "{{ index }} of {{ photoLength }}",
      "{{ replyCount }} Replies": "{{ replyCount }} Replies",
      "{{ replyCount }} Thread Replies": "{{ replyCount }} Thread Replies",
      "{{ user }} is typing": "{{ user }} is typing",
      "🏙 Attachment...": "🏙 Anexos...",
    },
    {
      months: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      monthsShort: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
      calendar: {
        sameDay: "Mesmo dia",
      },
    }
  );

  streami18n.setLanguage("pl");

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }

  return (
    <OverlayProvider style={{ zIndex: 99 }}>
      <Chat client={chatClient} i18nInstance={streami18n}>
        <Stack.Navigator>
          <Stack.Screen name="ChannelList" component={ChannelListScreen} />
          <Stack.Screen name="ChannelScreen" component={ChannelScreen} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="GerarOrcamento" component={GerarOcamento} />
        </Stack.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

export default () => {
  return (
    <AppProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <NavigationStack />
        </NavigationContainer>
      </SafeAreaView>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  botao_pagamento: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 3, // works on ios
    elevation: 3, // works on android
  },
});
