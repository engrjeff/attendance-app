"use client";

import mqtt, { type MqttClient } from "mqtt";
import React, { type ReactNode, useContext, useEffect, useState } from "react";

const MQTT = {
  BROKER: process.env.NEXT_PUBLIC_MQTT_WS_BROKER as string,
  PORT: Number(process.env.NEXT_PUBLIC_MQTT_WS_PORT),
  USERNAME: process.env.NEXT_PUBLIC_MQTT_USERNAME,
  PASSWORD: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
};

interface MQTTContextState {
  client: MqttClient | null;
  messages: Array<{ topic: string; message: string }>;
}

const MQTTContext = React.createContext<MQTTContextState | null>(null);

export function MQTTProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [messages, setMessages] = useState<MQTTContextState["messages"]>([]);

  useEffect(() => {
    const _client = mqtt.connect(MQTT.BROKER, {
      username: MQTT.USERNAME,
      password: MQTT.PASSWORD,
      port: MQTT.PORT,
      clientId: "jeffnextapp",
    });

    if (!_client) return;

    _client.on("connect", () => {
      setClient(_client);
    });

    return () => {
      _client.unsubscribe("attendance/test");
    };
  }, []);

  useEffect(() => {
    if (!client) return;

    client.subscribe("attendance/test");

    client.on("message", (topic, payload) => {
      const message = JSON.parse(payload.toString()).message;

      if (message === "register") {
        alert("Open Form!");
      }
      setMessages((current) => [...current, { topic, message }]);
    });
  }, [client]);

  return (
    <MQTTContext.Provider value={{ client, messages }}>
      {children}
    </MQTTContext.Provider>
  );
}

export function useMQTTClient() {
  const context = useContext(MQTTContext);

  if (!context)
    throw new Error(`useMQTTClient must be used inside a <MQTTProvider />.`);

  return context;
}
