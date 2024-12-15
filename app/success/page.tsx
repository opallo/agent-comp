// app/success/page.tsx
import HomeButton from '@/components/HomeButton';
export default function SuccessPage() {
  return (
    <div>
      <h1>Thank you for your payment!</h1>
      <p>Your payment was successful. We’ll get started on your order shortly.</p>
      <HomeButton />
    </div>
  );
}
