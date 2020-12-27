export function proxyModel(...keys: any[]) {
    return keys.reduce((all, key) => {
      return {
        ...all,
        [key]: {
          get(): any {
            return (this as any).value[key];
          },
          set(value: any) {
            (this as any).$emit("input", {
              ...(this as any).value,
              [key]: value
            });
          }
        }
      };
    }, {});
  }
  
  type TrackBy<T> = (item: T) => string;
  export function arrayToObject<T>(
    list: T[],
    trackBy: string | TrackBy<T>
  ): Record<string, T> {
    return list.reduce((all, item: any) => {
      const key = typeof trackBy === "string" ? item[trackBy] : trackBy(item);
      return { ...all, [key]: item };
    }, {});
  }
  