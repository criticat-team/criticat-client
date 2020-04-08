import { useQuery, useResult } from '@vue/apollo-composable';
import { currentCategoryQuery } from '@/state/queries';

export default function useCurrentCategory() {
  const { result } = useQuery(currentCategoryQuery);
  const category = useResult(result);
  return { category };
}
