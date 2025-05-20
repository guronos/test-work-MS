import type {ItemId, TreeItem} from "@/types/items.ts";

export class TreeStore {
    private baseItems: TreeItem[] = []
    private childrenMap: Map<ItemId, TreeItem[]> = new Map();

    constructor(items: TreeItem[]) {
        this.baseItems = items;

        items.forEach(item => {
            this.setItemInChildrenMap(item)
        })
    }

    public getAll(): TreeItem[] {
        return this.baseItems;
    }

    public getItem(id: ItemId): TreeItem {
        return this.baseItems.find(item => item.id === id);
    }

    public getChildren(parentId: ItemId): TreeItem[] {
        return this.childrenMap.get(parentId) || [];
    }

    public getAllChildren(parentId: ItemId): TreeItem[] {
        return this.addChild(this.getChildren(parentId))
    }

    public getAllParents(id: ItemId): TreeItem[] {
        return this.addParent(id, [])
    }

    public addItem (newItem: TreeItem): void {
        this.baseItems.push(newItem);
        this.setItemInChildrenMap(newItem);
    }

    public removeItem (id: ItemId): void {
        const allChildrenIds = [id, ...this.getAllChildren(id).map(i => i.id)]
        this.baseItems.forEach((i, idx) => {
            if (allChildrenIds.includes(i.id)) this.baseItems[idx] = undefined
        })
        this.baseItems = this.baseItems.filter(i => i)
    }

    public updateItem (updatedItem: TreeItem): void {
        const currentItemIdx = this.baseItems.findIndex(i => i.id === updatedItem.id);
        const currentItem = this.baseItems[currentItemIdx]
        if (currentItem.parent !== updatedItem.parent) {
            const currentArrayByOldParent = this.childrenMap.get(currentItem.parent)
            const idxOldItemByParent = currentArrayByOldParent.findIndex(i => i.id === updatedItem.id)
            if (idxOldItemByParent > -1) {
                currentArrayByOldParent.splice(idxOldItemByParent, 1)
                this.setItemInChildrenMap(updatedItem)
            }
        }
        Object.assign(currentItem, updatedItem);
    }


    private setItemInChildrenMap(item: TreeItem[]): void {
        var parent: ItemId | null = item.parent
        if (parent) {
            if (!this.childrenMap.has(parent)) this.childrenMap.set(parent, [item])
            else this.childrenMap.get(parent)!.push(item);
        }
    }

    private addParent(id, parents: TreeItem[]) {
        const item: TreeItem = this.getItem(id)
        if (item) {
            parents.push(item)
            if (item.parent) return this.addParent(item.parent, parents)
            else {
                return parents
            }
        }
    }

    private addChild(childrenArr: TreeItem[]) {
        const allChildren = []
        childrenArr.forEach(item => {
            allChildren.push(...this.getChildren(item.id))
        })
        if (allChildren.length) {
            return childrenArr.concat(this.addChild(allChildren))
        } else return childrenArr.concat(allChildren)
    }

}