import CustomMouse from "./components/custom-cursor";
import { Header } from "./components/header";

export default function Home() {
  return (
    <div className="px-32">
      <CustomMouse />
      <Header />
    </div>
  );
}
