"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMQTTClient } from "./providers/mqtt-provider";

export function TestTable() {
  const { messages } = useMQTTClient();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Topic</TableHead>
          <TableHead>Message</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {messages.map((message, index) => (
          <TableRow key={index.toString()}>
            <TableCell>{message.topic}</TableCell>
            <TableCell>{message.message}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
