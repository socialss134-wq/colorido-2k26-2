import { SectionHeading } from '@/components/shared/SectionHeading';
import { RegistrationForm } from '@/components/registration/RegistrationForm';
import { Card } from '@/components/ui/card';
import { FEST_CONFIG } from '@/lib/constants';
import { Calendar, MapPin, Clock, AlertCircle } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';

export default function RegistrationPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Join the fest" title="Register Now" subtitle="Fill in your details to participate in COLORIDO 2K26" />

      <Card className="mt-8 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Fest Date</p>
              <p className="text-sm font-medium">March 15-18, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Deadline</p>
              <p className="text-sm font-medium">March 10, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Venue</p>
              <p className="text-sm font-medium">{FEST_CONFIG.venue}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-700">
        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
        <p>Please ensure all information is accurate. You will receive a registration ID upon successful submission. Keep it for future reference.</p>
      </div>

      <div className="mt-8">
        <RegistrationForm />
      </div>
    </div>
  );
}
