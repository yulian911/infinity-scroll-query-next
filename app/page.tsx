'use client';
import Image from 'next/image';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getTodos } from '@/lib/actions';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import TodoCard from '@/components/TodoCard';

export default function Home() {
  // const query = useQuery({ queryKey: ['todos'], queryFn: getTodos });
  const { ref, inView } = useInView();
  const { data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
  const content = data?.pages.map(todos =>
    todos.map((todo: any, i: number) => {
      if (todos.length === i + 1) {
        return <TodoCard innerRef={ref} key={todo.id} todo={todo} />;
      }
      return <TodoCard key={todo.id} todo={todo} />;
    }),
  );
  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('Fire!');
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Somthing wrong</div>;

  return (
    <main className="app">
      {content}
      {/* <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
        {isFetchingNextPage ? 'Loading More' : 'Next'}
      </button> */}
      {isFetchingNextPage && <h3>Loading...</h3>}
    </main>
  );
}
