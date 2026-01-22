import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  const fadeInOnScroll = useCallback((
    selector: string,
    options?: {
      y?: number;
      duration?: number;
      stagger?: number;
      start?: string;
    }
  ) => {
    if (!elementRef.current) return;

    const elements = elementRef.current.querySelectorAll(selector);
    
    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: options?.y ?? 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: options?.duration ?? 1,
        stagger: options?.stagger ?? 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: options?.start ?? 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const parallax = useCallback((
    selector: string,
    speed: number = 0.5
  ) => {
    if (!elementRef.current) return;

    const elements = elementRef.current.querySelectorAll(selector);
    
    elements.forEach((element) => {
      gsap.to(element, {
        yPercent: -50 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }, []);

  const scaleOnScroll = useCallback((
    selector: string,
    options?: {
      scale?: number;
      duration?: number;
    }
  ) => {
    if (!elementRef.current) return;

    const elements = elementRef.current.querySelectorAll(selector);
    
    gsap.fromTo(
      elements,
      {
        scale: options?.scale ?? 0.8,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: options?.duration ?? 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return {
    elementRef,
    fadeInOnScroll,
    parallax,
    scaleOnScroll,
  };
};

export const useMagneticEffect = () => {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = magneticRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * 0.3;
      const deltaY = (e.clientY - centerY) * 0.3;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return magneticRef;
};

export const useTiltEffect = (intensity: number = 15) => {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = tiltRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * -intensity;
      const rotateY = (x - centerX) / centerX * intensity;

      gsap.to(element, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return tiltRef;
};
