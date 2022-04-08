import { useEffect, useRef } from 'react';

export function useOnDraw(onDraw) {
  const canvasRef = useRef(null);

  const isDrawingRef = useRef(false);

  const mouseMoveListenerRef = useRef(null);
  const mouseDownListenerRef = useRef(null);
  const mouseUpListenerRef = useRef(null);
  const touchMoveListenerRef = useRef(null);
  const touchStartListenerRef = useRef(null);
  const touchEndListenerRef = useRef(null);

  const prevPointRef = useRef(null);

  useEffect(() => {
    return () => {
      if (mouseMoveListenerRef.current) {
        window.removeEventListener('mousemove', mouseMoveListenerRef.current);
      }
      if (mouseUpListenerRef.current) {
        window.removeEventListener('mouseup', mouseUpListenerRef.current);
      }
    };
  }, []);

  function setCanvasRef(ref) {
    if (!ref) return;
    if (canvasRef.current) {
      canvasRef.current.removeEventListener(
        'mousedown',
        mouseDownListenerRef.current
      );
      canvasRef.current.removeEventListener(
        'touchstart',
        touchStartListenerRef.current
      );
    }
    canvasRef.current = ref;
    initMoveListener();
    initStartListener();
    initEndListener();
  }

  function initMoveListener() {
    const moveListener = (e) => {
      let clientX, clientY;
      if (isDrawingRef.current) {
        if (e.type.includes('mouse')) {
          clientX = e.clientX;
          clientY = e.clientY;
        } else {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        }
        const point = computePointInCanvas(clientX, clientY);
        const ctx = canvasRef.current.getContext('2d');
        if (onDraw) onDraw(ctx, point, prevPointRef.current);
        prevPointRef.current = point;
        console.log(point);
      }
    };
    mouseMoveListenerRef.current = moveListener;
    touchMoveListenerRef.current = moveListener;
    window.addEventListener('mousemove', moveListener);
    window.addEventListener('touchmove', moveListener);
  }

  function initEndListener() {
    const listener = () => {
      isDrawingRef.current = false;
      prevPointRef.current = null;
    };
    mouseUpListenerRef.current = listener;
    touchEndListenerRef.current = listener;
    window.addEventListener('mouseup', listener);
    window.addEventListener('touchend', listener);
  }

  function initStartListener() {
    if (!canvasRef.current) return;
    const listener = () => {
      isDrawingRef.current = true;
    };
    mouseDownListenerRef.current = listener;
    touchStartListenerRef.current = listener;
    canvasRef.current.addEventListener('mousedown', listener);
    canvasRef.current.addEventListener('touchstart', listener);
  }

  function computePointInCanvas(clientX, clientY) {
    if (canvasRef.current) {
      const boundingRect = canvasRef.current.getBoundingClientRect();
      return {
        x: clientX - boundingRect.left,
        y: clientY - boundingRect.top,
      };
    } else {
      return null;
    }
  }

  return setCanvasRef;
}
