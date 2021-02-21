import { rem } from "polished"
import React, { useEffect, useState } from "react"
import styled, { css } from "styled-components"

const Display = styled.span`
  display: inline-block;
  height: ${rem(20)};

  color: ${({ theme }) => theme.text.muted};

  ${({ theme }) =>
    theme.appearance.display === "cozy" &&
    css`
      margin-left: ${rem(4)};

      font-size: ${rem(12)};
      font-weight: 500;
      line-height: ${rem(22)};
      vertical-align: baseline;

      &::before {
        content: "Today at ";
      }
    `};

  ${({ theme }) =>
    theme.appearance.display === "compact" &&
    css`
      width: ${rem(48)};
      margin-right: ${rem(8)};

      font-size: ${rem(11)};
      line-height: ${rem(22)};
      text-align: right;
      text-indent: 0;

      &::before {
        content: "";
      }
    `};
`

const getTime = (timestamp: Date = new Date()) =>
  timestamp.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })

export type ClockProps = {
  timestamp?: Date
}

export function Clock(props: ClockProps) {
  const { timestamp } = props

  const [displayedTime, setDisplayedTime] = useState(() => getTime(timestamp))
  useEffect(() => {
    if (Number.isNaN(timestamp)) {
      const interval = setInterval(() => {
        setDisplayedTime(getTime())
      }, 1000)
      return () => clearInterval(interval)
    }

    setDisplayedTime(getTime(timestamp))
  }, [timestamp])

  return <Display>{displayedTime}</Display>
}
