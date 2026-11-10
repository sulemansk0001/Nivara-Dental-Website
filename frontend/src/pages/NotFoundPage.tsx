import React from 'react';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div>
      <PageHero
        badge="404 Error"
        title="Page Not"
        highlightedText="Found."
        description="The dental page or article you are searching for might have been moved, renamed, or is temporarily unavailable."
        breadcrumbs={[{ label: '404' }]}
        ctaButton={
          <Button to="/" variant="primary" withArrow>
            Return to Homepage
          </Button>
        }
      />
    </div>
  );
};
