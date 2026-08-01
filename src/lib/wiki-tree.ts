type WikiEntry = {
  id: string;
  data: {
    title: string;
  };
};

type WikiTreeNode = {
  segment: string;
  path: string;
  entry?: WikiEntry;
  folders: Map<string, WikiTreeNode>;
  pages: WikiEntry[];
};

export type WikiSidebarItem = {
  key: string;
  depth: number;
  label: string;
  href?: string;
  kind: 'folder' | 'page';
  active: boolean;
  branchActive: boolean;
};

export function pathFromEntry(entry: WikiEntry): string {
  return entry.id
    .replace(/\.md$/i, '')
    .split('/')
    .map((segment) =>
      segment
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, ''),
    )
    .filter(Boolean)
    .join('/');
}

function createNode(segment: string, path: string): WikiTreeNode {
  return {
    segment,
    path,
    folders: new Map(),
    pages: [],
  };
}

function titleize(segment: string): string {
  return segment
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function compareEntries(first: WikiEntry, second: WikiEntry): number {
  return first.data.title.localeCompare(second.data.title);
}

function insertEntry(root: WikiTreeNode, entry: WikiEntry): void {
  const rawSegments = entry.id.replace(/\.md$/i, '').split('/');
  const isIndexPage = rawSegments.at(-1) === 'index';
  const folderSegments = isIndexPage ? rawSegments.slice(0, -1) : rawSegments.slice(0, -1);

  let currentNode = root;
  let currentPath = '';

  for (const segment of folderSegments) {
    currentPath = currentPath ? `${currentPath}/${segment}` : segment;
    const existing = currentNode.folders.get(segment);

    if (existing) {
      currentNode = existing;
      continue;
    }

    const nextNode = createNode(segment, currentPath);
    currentNode.folders.set(segment, nextNode);
    currentNode = nextNode;
  }

  if (isIndexPage) {
    currentNode.entry = entry;
    return;
  }

  currentNode.pages.push(entry);
}

function flattenTree(root: WikiTreeNode, currentSlug: string): WikiSidebarItem[] {
  const items: WikiSidebarItem[] = [];

  const visit = (node: WikiTreeNode, depth: number): void => {
    const folderChildren = [...node.folders.values()].sort((first, second) =>
      titleize(first.segment).localeCompare(titleize(second.segment)),
    );
    const pageChildren = [...node.pages].sort(compareEntries);

    for (const folder of folderChildren) {
      const label = folder.entry?.data.title ?? titleize(folder.segment);
      const href = folder.entry ? `/posts/${pathFromEntry(folder.entry)}` : undefined;
      const folderPath = folder.entry ? pathFromEntry(folder.entry) : folder.path;
      const active = folderPath === currentSlug;
      const branchActive = currentSlug === folder.path || currentSlug.startsWith(`${folder.path}/`);

      items.push({
        key: `folder:${folder.path}`,
        depth,
        label,
        href,
        kind: 'folder',
        active,
        branchActive,
      });

      visit(folder, depth + 1);
    }

    for (const page of pageChildren) {
      items.push({
        key: `page:${pathFromEntry(page)}`,
        depth,
        label: page.data.title,
        href: `/posts/${pathFromEntry(page)}`,
        kind: 'page',
        active: pathFromEntry(page) === currentSlug,
        branchActive: pathFromEntry(page) === currentSlug,
      });
    }
  };

  visit(root, 0);
  return items;
}

export function buildWikiSidebarItems(entries: WikiEntry[], currentSlug = ''): WikiSidebarItem[] {
  const root = createNode('', '');

  for (const entry of entries) {
    insertEntry(root, entry);
  }

  return flattenTree(root, currentSlug);
}