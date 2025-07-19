import { useExperiences } from '@/hooks/useExperiences';
import TimelineLayout from './TimelineLayout';

const ExperienceTimeline = () => {
  const { data: experiences = [], isLoading: loading } = useExperiences();

  const timelineData = experiences.map(exp => ({
    id: exp.id,
    title: exp.position,
    subtitle: `${exp.company} • ${exp.employment_type}`,
    start_date: exp.start_date,
    end_date: exp.end_date,
    description: exp.description
  }));

  return (
    <TimelineLayout
      id="experience"
      title="Professional Experience"
      subtitle="My professional journey so far"
      data={timelineData}
      loading={loading}
    />
  );
};

export default ExperienceTimeline;
