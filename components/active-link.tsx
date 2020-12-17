import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import {
  Children,
  cloneElement,
  PropsWithChildren,
  ReactHTMLElement,
} from 'react'

type ActiveLinkProps = PropsWithChildren<{
  activeClassName: string
}>

function ActiveLink({
  activeClassName,
  children,
  ...props
}: ActiveLinkProps & LinkProps) {
  const { asPath } = useRouter()
  const child = Children.only(children) as ReactHTMLElement<HTMLAnchorElement>
  const childClassName = child.props.className || ''

  // Matching example:
  // pages/index.tsx would be matched via props.href
  // pages/about.tsx would be matched via props.href
  // pages/[slug].tsx would be matched via props.as
  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <Link {...props}>
      {cloneElement(child, {
        className: className || undefined,
      })}
    </Link>
  )
}

export default ActiveLink
