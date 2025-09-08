import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Menu, ChevronRight, ChevronDown, Search, X } from 'lucide-react';

/**
 * Dual overlay sidebars (Left=대분류, Middle=소분류) + Content
 * - Proper overlay layering and closing behavior
 * - Both sidebars slide in/out together
 * - Scrim covers entire background
 */

export type MenuItem = {
  id: string;
  label: string;
  children?: MenuItem[];
};

const menuData: MenuItem[] = [
  {
    id: 'about',
    label: '소개',
    children: [
      { id: 'about-overview', label: 'Overview' },
      { id: 'about-keypoints', label: 'Key points' },
    ],
  },
  {
    id: 'sample',
    label: 'SDK 예제',
    children: [
      {
        id: 'sample-basic',
        label: 'Basic samples',
        children: [
          { id: 'sample-hello-map', label: 'Hello map' },
          { id: 'sample-marker', label: 'Marker' },
        ],
      },
      { id: 'sample-events', label: 'Events' },
    ],
  },
  {
    id: 'doc',
    label: 'SDK 문서',
    children: [
      { id: 'doc-api', label: 'API Reference' },
      { id: 'doc-url', label: 'URL Schemes' },
    ],
  },
];

const contentMap: Record<string, { title: string; body: string } | undefined> =
  {
    'about-overview': {
      title: 'Overview',
      body: '프로젝트와 문서의 전반 소개.',
    },
    'about-keypoints': {
      title: 'Key points',
      body: '핵심 개념과 설계 포인트.',
    },
    'sample-hello-map': { title: 'Hello map', body: '가장 단순한 지도 예제.' },
    'sample-marker': { title: 'Marker', body: '마커 표시, 커스텀, 인터랙션.' },
    'sample-events': { title: 'Events', body: '클릭/드래그 등 이벤트 처리.' },
    'doc-api': { title: 'API Reference', body: '핵심 API 목록과 시그니처.' },
    'doc-url': { title: 'URL Schemes', body: 'URL 파라미터 규칙과 예시.' },
  };

function findPathById(
  nodes: MenuItem[],
  id: string,
  path: string[] = [],
): string[] | null {
  for (const node of nodes) {
    const next = [...path, node.label];
    if (node.id === id) return next;
    if (node.children) {
      const p = findPathById(node.children, id, next);
      if (p) return p;
    }
  }
  return null;
}

export default function DocsLayoutDualSidebars() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTopId, setActiveTopId] = useState<string>(menuData[0].id);
  const firstChildren =
    menuData.find((m) => m.id === activeTopId)?.children ?? [];
  const firstLeafId =
    firstChildren[0]?.children?.[0]?.id || firstChildren[0]?.id || '';
  const [selectedLeafId, setSelectedLeafId] = useState<string>(firstLeafId);

  const ensureSelected = (topId: string) => {
    const children = menuData.find((m) => m.id === topId)?.children ?? [];
    const head = children[0];
    if (!head) return setSelectedLeafId('');
    setSelectedLeafId(head.children?.length ? head.children[0].id : head.id);
  };

  const breadcrumb = useMemo(
    () => findPathById(menuData, selectedLeafId) ?? [],
    [selectedLeafId],
  );
  const selected = contentMap[selectedLeafId] ?? {
    title: '문서',
    body: '좌측에서 항목을 선택하세요.',
  };

  useEffect(() => {
    if (!sidebarOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sidebarOpen]);

  return (
    <div className='h-screen w-full relative'>
      {/* SCRIM overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/40'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebars container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex transition-transform duration-300 ${sidebarOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'}`}
      >
        {/* LEFT sidebar */}
        <aside className='w-56 border-r bg-background h-full flex flex-col'>
          <div className='h-14 px-2 pr-3 flex items-center gap-2 border-b'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setSidebarOpen(false)}
            >
              <X className='h-4 w-4' />
            </Button>
            <span className='font-semibold'>대분류</span>
            <Badge variant='secondary' className='ml-auto'>
              Top
            </Badge>
          </div>
          <ScrollArea className='flex-1'>
            <nav className='p-2 space-y-1'>
              {menuData.map((top) => {
                const active = top.id === activeTopId;
                return (
                  <Button
                    key={top.id}
                    variant={active ? 'secondary' : 'ghost'}
                    className={`w-full justify-start h-9 px-3 ${active ? 'font-semibold' : ''}`}
                    onClick={() => {
                      setActiveTopId(top.id);
                      ensureSelected(top.id);
                    }}
                  >
                    <ChevronRight className='mr-2 h-4 w-4 opacity-60' />
                    {top.label}
                  </Button>
                );
              })}
            </nav>
          </ScrollArea>
        </aside>

        {/* MIDDLE sidebar */}
        <aside className='w-72 border-r bg-background h-full flex flex-col'>
          <div className='h-14 px-4 flex items-center gap-2 border-b bg-background'>
            <span className='font-semibold'>소분류</span>
            <Separator orientation='vertical' className='mx-2 h-6' />
            <div className='relative ml-auto w-36'>
              <Search className='absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60' />
              <Input placeholder='검색' className='pl-8 h-8' />
            </div>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setSidebarOpen(false)}
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
          <ScrollArea className='flex-1'>
            <nav className='p-2'>
              {firstChildren.length === 0 && (
                <div className='text-sm text-muted-foreground px-2 py-4'>
                  이 분류에는 항목이 없습니다.
                </div>
              )}
              {firstChildren.map((node) => {
                const isLeaf = !node.children || node.children.length === 0;
                if (isLeaf) {
                  return (
                    <Button
                      key={node.id}
                      variant={
                        selectedLeafId === node.id ? 'secondary' : 'ghost'
                      }
                      className={`w-full justify-start h-9 px-3 ${selectedLeafId === node.id ? 'font-semibold' : ''}`}
                      onClick={() => setSelectedLeafId(node.id)}
                    >
                      <ChevronRight className='mr-2 h-4 w-4 opacity-60' />
                      {node.label}
                    </Button>
                  );
                }
                return (
                  <Collapsible key={node.id}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant='ghost'
                        className='w-full justify-between h-9 px-3'
                      >
                        <span className='flex items-center'>
                          <ChevronRight className='mr-2 h-4 w-4 opacity-60' />
                          {node.label}
                        </span>
                        <ChevronDown className='h-4 w-4 opacity-60' />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className='pl-4'>
                      <div className='flex flex-col'>
                        {(node.children ?? []).map((leaf) => (
                          <Button
                            key={leaf.id}
                            variant={
                              selectedLeafId === leaf.id ? 'secondary' : 'ghost'
                            }
                            className={`w-full justify-start h-8 px-3 text-sm ${selectedLeafId === leaf.id ? 'font-semibold' : ''}`}
                            onClick={() => setSelectedLeafId(leaf.id)}
                          >
                            <ChevronRight className='mr-2 h-4 w-4 opacity-60' />
                            {leaf.label}
                          </Button>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </nav>
          </ScrollArea>
        </aside>
      </div>

      {/* MAIN */}
      <main className='h-full w-full flex flex-col relative z-0'>
        <div className='h-14 border-b flex items-center gap-2 px-4 bg-background sticky top-0 z-10'>
          <Button
            aria-label='toggle sidebars'
            variant='ghost'
            size='icon'
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className='h-5 w-5' />
          </Button>
          <Separator orientation='vertical' className='mx-2 h-6' />
          <div className='text-sm text-muted-foreground truncate'>
            {breadcrumb.join(' / ')}
          </div>
        </div>
        <div className='flex-1 overflow-auto p-6'>
          <h1 className='text-2xl font-bold mb-3'>{selected.title}</h1>
          <p className='text-muted-foreground leading-7'>{selected.body}</p>
          <div className='mt-6 rounded-2xl border p-4'>
            <h2 className='font-semibold mb-2'>샘플 코드</h2>
            <pre className='text-sm overflow-auto'>
              <code>{`// 여기에 ${selected.title} 관련 코드 스니펫을 렌더링하세요.`}</code>
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}
