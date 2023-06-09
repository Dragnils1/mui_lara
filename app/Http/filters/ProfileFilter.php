<?php


namespace App\Http\Filters;


use Illuminate\Database\Eloquent\Builder;

class ProfileFilter extends AbstractFilter
{
    public const TITLE = 'title';
    public const CONTENT = 'content';
    public const CATEGORY_ID = 'category_id';
    public const STATUS = 'status';
    public const STATUS_NOT = 'status_not';
    public const STATUSES = 'statuses';
    public const STATUS_IN = 'status_in';
    public const NOT_FAV_DATE = 'not_fav_date';
    public const VIP = 'vip';




    protected function getCallbacks(): array
    {
        return [
            self::TITLE => [$this, 'title'],
            self::CONTENT => [$this, 'content'],
            self::CATEGORY_ID => [$this, 'categoryId'],
            self::STATUS => [$this, 'status'],
            self::STATUSES => [$this, 'statuses'],
            self::STATUS_IN => [$this, 'status_in'],
            self::STATUS_NOT => [$this, 'status_not'],
            self::NOT_FAV_DATE => [$this, 'not_fav_date'],
            self::VIP => [$this, 'vip'],
        ];
    }

    public function title(Builder $builder, $value)
    {
        $builder->where('title', 'like', "%{$value}%");
    }

    public function vip(Builder $builder, $value)
    {
        $builder->where('vip', $value);
    }

    public function status(Builder $builder, $value)
    {
        $builder->where('status', $value);
    }

    public function status_in(Builder $builder, $value)
    {
        $builder->whereIn('status', explode(',', $value));
    }


    public function statuses(Builder $builder, $value)
    {
        $builder->whereIn('status', $value);
    }

    public function status_not(Builder $builder, $value)
    {
        $builder->whereNot('status', $value);
    }

    public function not_fav_date(Builder $builder, $value)
    {
        $builder->whereNot('fav_date', '');
    }


    public function content(Builder $builder, $value)
    {
        $builder->where('content', 'like', "%{$value}%");
    }

    public function categoryId(Builder $builder, $value)
    {
        $builder->where('category_id', $value);
    }
}
