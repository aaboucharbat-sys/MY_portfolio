import { useLayoutEffect, useRef } from "react";
import { useWindowStore } from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const WindowWrapper = (component, windowKey) => {
  const Comp = component;

  const Wrapped = (props) => {
    // 1. استخراج الحالات (بما فيها التكبير) من الستور
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex, isMinimized, isMaximized } = windows[windowKey];
    
    const ref = useRef(null);
    const draggableInstance = useRef(null); // الاحتفاظ بنسخة السحب للتحكم بها

    // 2. تسيير الأنيميشن (الفتح، التصغير، والتكبير)
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      if (isOpen && !isMinimized) {
        el.style.display = "block";

        if (isMaximized) {
          // جلب موقع النافذة الحالي قبل التكبير لجعل الانتقال متناسقاً إذا تطلب الأمر، 
          // أو التكبير المباشر لملء الشاشة:
          gsap.to(el, {
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            x: 0, // تصفير قيم الـ Draggable x و y
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
            onStart: () => {
              if (draggableInstance.current) draggableInstance.current.disable(); // تعطيل السحب
            }
          });
        } else {
          // الحالة العادية (النافذة العائمة)
          gsap.to(el, {
            scale: 1,
            opacity: 1,
            // القيم الافتراضية لأبعاد النافذة العادية (يمكنك تعديلها حسب الـ CONFIG الخاص بك)
            width: "auto", 
            height: "auto",
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
            onStart: () => {
              if (draggableInstance.current) draggableInstance.current.enable(); // تفعيل السحب مجدداً
            }
          });
        }
      } else if (isMinimized) {
        // حالة التصغير
        gsap.to(el, {
          scale: 0.8,
          opacity: 0,
          y: 40,
          duration: 0.4,
          ease: "power2.in",
          overwrite: "auto",
          onComplete: () => {
            el.style.display = "none";
          }
        });
      }
    }, [isOpen, isMinimized, isMaximized]); // إضافة isMaximized كمراقب للتغيير

    // 3. إعداد ميزة السحب (Draggable)
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;
      
      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
      });
      
      draggableInstance.current = instance; // تخزين النسخة
      
      return () => instance.kill();
    }, []);

    // 4. التحكم الأولي لمنع الـ Flicker
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      
      if (!isOpen) {
        el.style.display = "none";
      } else if (!isMinimized) {
        el.style.display = "block";
      }
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ 
          zIndex,
          transformOrigin: "center bottom" 
        }}
        className="absolute"
        onMouseDown={() => focusWindow(windowKey)}
      >
        <Comp {...props} />
      </section>
    );
  };

  Wrapped.displayName = `windowWrapper(${component.displayName || component.name || "component"})`;

  return Wrapped;
};

export default WindowWrapper;