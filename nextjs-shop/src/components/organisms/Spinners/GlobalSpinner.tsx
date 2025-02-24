'use client'

import styled from 'styled-components'
import Spinner from '@/components/atoms/Loadings/Spinner'
import { useGlobalSpinnerContext } from '@/contexts/GlobalSpinnerActionsContext'

const SpinnerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
`

/**
 * グローバルスピナー
 */
export default function GlobalSpinner() {
  // グローバルスピナーコンテキストのフック
  const isGlobalSpinnerOn = useGlobalSpinnerContext()

  return (
    <>
      {isGlobalSpinnerOn && (
        <SpinnerWrapper>
          <Spinner $isAutoCentering={true} />
        </SpinnerWrapper>
      )}
    </>
  )
}
