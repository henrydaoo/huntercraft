import { useEducations } from '@/hooks/useEducations';
import TimelineLayout from './TimelineLayout';

const EducationTimeline = () => {
  const { data: educations = [], isLoading: loading } = useEducations();

  const timelineData = educations.map(edu => ({
    id: edu.id,
    title: edu.degree,
    subtitle: edu.school,
    start_date: edu.start_date,
    end_date: edu.end_date,
    description: edu.description
  }));

  return (
    <TimelineLayout
      id="education"
      title="Education"
      subtitle="My academic background"
      data={timelineData}
      loading={loading}
    />
  );
};

export default EducationTimeline;
