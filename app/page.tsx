import { MQTTProvider } from "@/components/providers/mqtt-provider";
import { TestTable } from "@/components/test-table";

export default function Home() {
  return (
    <MQTTProvider>
      <TestTable />
    </MQTTProvider>
  );
}
