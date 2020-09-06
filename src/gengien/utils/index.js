/**
 * - Развешивает собития на объекты сцены
 * @function addEventCustomListener
 * @param obj
 * @param callback [options] - метод который навешивает события на объекты сцена "type" : "click", event : function
 */
export const addEventCustomListener = (obj, callback) => {
  if (callback.length) {
    callback.map((el, i) => {
      if (el.type && el.event) {
        if (obj.on) {
          obj.on(el.type, (e) => el.event(e));
        }
      } else {
        console.log("Тип события не определен!");
      }
    });
  }
};

const getPropertysForGenericGroup = (props) => {
  if (props) {
    return props._self.props.requiredPropertys;
  }
  return false;
};

export const checkRequiredProperty = (requiredPropertys, props) => {
  if (!requiredPropertys) {
    return getPropertysForGenericGroup(props.children);
  } else {
    return requiredPropertys;
  }
};
