import Background from "@/components/layout/background";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return <Background>{children}</Background>;
}
