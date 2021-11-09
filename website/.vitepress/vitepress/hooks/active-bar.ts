import type { Ref } from 'vue'
import { onMounted } from 'vue'
export function throttleHandler(fn: () => any, delay: number) {
  let timeout: ReturnType<typeof setTimeout>
  let called = false;
  return () => {
    if (timeout) {
      clearTimeout(timeout)
    }
    if (!called) {
      fn();
      called = true;
      setTimeout(() => {
        called = false;
      }, delay)
    } else {
      timeout = setTimeout(fn, delay)
    }
  }
}

function deactiveLink(link: HTMLAnchorElement | null) {
  link && link.classList.remove('is-active')
}

function getSidebarLinks() {
  return Array.from(document.querySelectorAll('.vp-catalog a')) as HTMLAnchorElement[]
}

function getAnchors(sidebarLinks: HTMLAnchorElement[]) {
  return (
    Array.from(
      document.querySelectorAll('.app-main .header-anchor')
    ) as HTMLAnchorElement[]
  ).filter((anchor =>
    sidebarLinks.some((sidebarLink) => sidebarLink.hash === anchor.hash))
  )
}

export function useActiveSidebarLinks(container: Ref<HTMLElement>, marker: Ref<HTMLElement>) {
  const onScroll = throttleHandler(setActiveLink, 150);

  let prevActiveLink: HTMLAnchorElement | null = null;

  function setActiveLink() {
    const sidebarLinks = getSidebarLinks();
    const anchors = getAnchors(sidebarLinks);

    if (anchors.length && window.scrollY + window.innerHeight === document.body.offsetHeight) {
      activeLink(anchors[anchors.length - 1].hash);
      return;
    }

    for (let i = 0; i < anchors.length; ++i) {
      const anchor = anchors[i]
      const nextAnchor = anchors[i + 1]
      const [isActive, hash] = isAnchorAtive(i, anchor, nextAnchor)
      if (isActive) {
        history.replaceState(null, document.title, (hash ?? '') as string)
        activeLink(hash as string)
        return;
      }
    }
  }
  function activeLink(hash: string) {
    deactiveLink(prevActiveLink);
    const activeLink = hash == null ?
      null :
      container.value.querySelector(
        `.vp-catalog a[href="${decodeURIComponent(hash)}"`
      ) as HTMLAnchorElement
    prevActiveLink = activeLink;
    if (activeLink) {
      activeLink.classList.add('is-active')
      marker.value.style.opacity = '1'
      marker.value.style.top = activeLink.offsetTop + 'px';
    } else {
      marker.value.style.opacity = '0'
      marker.value.style.top = '0';
    }
  }

  onMounted(() => {
    window.requestAnimationFrame(setActiveLink)
    window.addEventListener('scroll', onScroll)
  })
}

function isAnchorAtive(
  index: number,
  anchor: HTMLAnchorElement,
  nextAnchor: HTMLAnchorElement,
) {
  const scrollTop = window.scrollY;
  if (index === 0 && scrollTop === 0) {
    return [true, null]
  }
  if (scrollTop < getAnchorTop(anchor)) {
    return [false, null]
  }
  if (!nextAnchor || scrollTop < getAnchorTop(nextAnchor)) {
    return [true, decodeURIComponent(anchor.hash)]
  }
  return [false, null]
}

function getAnchorTop(anchor: HTMLAnchorElement) {
  return anchor.parentElement?.offsetTop ?? 0;
}
