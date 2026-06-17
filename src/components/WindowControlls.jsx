import { useWindowStore } from "#store/window";

const WindowControls = ({ target }) => {
  const { closeWindow, minWindow, toggleMaximize } = useWindowStore();

  return (
    <div id="window-controls">
      {/* تمرير الـ target كـ arrow function ليتم التعرف على مفتاح النافذة */}
      <div className="close" onClick={() => closeWindow(target)} />
      <div className="minimize" onClick={() => toggleMaximize(target)} />
      <div className="maximize" onClick={() => minWindow(target)} />
    </div>
  );
};

export default WindowControls;
