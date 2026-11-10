import React from 'react';
import { Counter } from '../common/Counter';
import { Award, Users, Stethoscope, ShieldCheck } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const stats = [
    {
      icon: Award,
      value: 10,
      suffix: '+',
      title: 'Years of Experience',
      sub: 'Dedicated clinical practice',
    },
    {
      icon: Users,
      value: 5000,
      suffix: '+',
      title: 'Happy Patients',
      sub: 'Treated with gentle care',
    },
    {
      icon: Stethoscope,
      value: 3,
      suffix: '+',
      title: 'Dental Specialists',
      sub: 'MDS certified surgeons',
    },
    {
      icon: ShieldCheck,
      value: 100,
      suffix: '%',
      title: 'Focus on Hygiene',
      sub: 'Hospital-grade sterilization',
    },
  ];

  return (
    <section className="bg-white border-b border-clinic-border py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-clinic-border">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-4 ${
                  idx !== 0 ? 'sm:pl-6 lg:pl-8' : ''
                } ${idx > 1 ? 'pt-4 sm:pt-0' : ''}`}
              >
                <div className="w-12 h-12 rounded-xl bg-skyblue-light border border-skyblue/20 flex items-center justify-center text-skyblue flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-navy tracking-tight">
                    <Counter end={item.value} suffix={item.suffix} />
                  </div>
                  <div className="text-xs font-bold text-navy mt-0.5">{item.title}</div>
                  <div className="text-[11px] text-clinic-muted">{item.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
