import {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactNode,
} from 'react'

type DetailProps = {
  children: ReactNode[] | ReactNode
}

function Detail({ children }: DetailProps) {
  return (
    <div className="flex items-center space-x-2">
      {Children.map(children, child => {
        if (!isValidElement(child)) {
          return null
        }

        return typeof child.type === 'string' ? child : cloneElement(child)
      })}
    </div>
  )
}

function DetailTerm({ children }: PropsWithChildren<unknown>) {
  return <dt>{children}</dt>
}

function DetailDescription({ children }: PropsWithChildren<unknown>) {
  return (
    <dd>
      <span className="text-sm text-gray-500 font-medium">{children}</span>
    </dd>
  )
}

export { Detail, DetailTerm, DetailDescription }
